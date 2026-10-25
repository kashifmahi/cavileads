#!/usr/bin/env bash
# Cavicord daily refresh — run from cron every morning.
#   1. Re-verify every listed bank APY against the bank's page (stamps confirmed rows with today's date,
#      emails OWNER_EMAIL a list of rows it could not confirm).
#   2. Refresh FDIC national averages.
#   3. Rebuild + prerender the frontend so the new "Rates updated" date is baked into the static HTML.
#   4. Reload nginx.
#
# Install:
#   chmod +x /opt/app/deploy/daily-refresh.sh
#   sudo crontab -e   →   15 6 * * * /opt/app/deploy/daily-refresh.sh >> /var/log/cavicord-refresh.log 2>&1
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/app}"
API="${API:-http://127.0.0.1:8001/api}"
ENV_FILE="$APP_DIR/backend/.env"

ADMIN_KEY="$(grep -E '^ADMIN_KEY=' "$ENV_FILE" | cut -d= -f2- | tr -d '"' | tr -d "'")"
if [[ -z "$ADMIN_KEY" ]]; then
  echo "[$(date -Is)] ADMIN_KEY missing in $ENV_FILE" >&2
  exit 1
fi

echo "[$(date -Is)] verifying bank rates…"
if ! curl -sf "$API/" >/dev/null; then
  echo "[$(date -Is)] backend not reachable at $API — is cavicord-api running? (systemctl status cavicord-api)" >&2
  exit 1
fi
curl -sS -m 300 -X POST "$API/admin/rates/verify-run" -H "X-Admin-Key: $ADMIN_KEY" \
  | python3 -c '
import sys, json
d = json.load(sys.stdin)
if "confirmed" not in d:
    print("verify failed:", d); sys.exit(1)
print("confirmed=%d unconfirmed=%d errored=%d fdic=%s" % (len(d["confirmed"]), len(d["unconfirmed"]), len(d["errored"]), d["fdic_refreshed"]))
for x in d["unconfirmed"] + d["errored"]:
    print("  ?", x)
'

echo "[$(date -Is)] rebuilding frontend…"
cd "$APP_DIR/frontend"
yarn build >/dev/null
node prerender.mjs 2>/dev/null | tail -2

echo "[$(date -Is)] reloading nginx…"
nginx -t >/dev/null && systemctl reload nginx
echo "[$(date -Is)] done"
