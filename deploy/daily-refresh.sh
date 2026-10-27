#!/usr/bin/env bash
# Cavicord daily refresh — run from cron every morning.
#   1. Re-verify every listed bank APY against the bank's page (stamps confirmed rows with today's date,
#      emails OWNER_EMAIL a list of rows it could not confirm).
#   2. Refresh FDIC national averages.
#   3. Build + prerender into a STAGING dir, then atomically swap it live only on success.
#      The live site keeps serving the previous good build if anything fails.
#   4. Reload nginx.
#
# Install:
#   chmod +x /opt/app/deploy/daily-refresh.sh
#   sudo crontab -e   →   15 6 * * * /opt/app/deploy/daily-refresh.sh >> /var/log/cavicord-refresh.log 2>&1
set -euo pipefail
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

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

echo "[$(date -Is)] building into staging…"
cd "$APP_DIR/frontend"
rm -rf build-staging
yarn build --outDir build-staging

echo "[$(date -Is)] prerendering staging…"
PRERENDER_DIR=build-staging node prerender.mjs | tail -3

# sanity: prerendered home must contain actual rate content
if ! grep -q "APY" build-staging/index.html; then
  echo "[$(date -Is)] ABORT: staged home has no rate content — keeping current live build" >&2
  exit 1
fi

echo "[$(date -Is)] swapping staging live…"
rm -rf build.bak
[[ -d build ]] && mv build build.bak
mv build-staging build

echo "[$(date -Is)] reloading nginx…"
nginx -t >/dev/null && systemctl reload nginx
echo "[$(date -Is)] done"
