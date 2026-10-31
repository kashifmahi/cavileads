import io, json, os, re, sys
import urllib.request as ur
from PIL import Image

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9"}
OUT = "/app/frontend/public/assets/banks"
os.makedirs(OUT, exist_ok=True)

BANKS = {
    "bask": "https://www.baskbank.com", "marcus": "https://www.marcus.com",
    "ally": "https://www.ally.com", "synchrony": "https://www.synchronybank.com",
    "discover": "https://www.discover.com", "barclays": "https://www.banking.barclaysus.com",
    "capitalone": "https://www.capitalone.com", "bread": "https://www.breadfinancial.com",
    "quontic": "https://www.quontic.com", "bmoalto": "https://alto.bmo.com",
    "cit": "https://www.cit.com", "creditone": "https://www.creditonebank.com",
    "navyfederal": "https://www.navyfederal.org", "suncoast": "https://www.suncoastcreditunion.com",
}

def get(url, binary=True, timeout=15):
    req = ur.Request(url, headers=UA)
    with ur.urlopen(req, timeout=timeout) as r:
        return r.read() if binary else r.read().decode("utf-8", "ignore"), r.geturl()

def candidates(base):
    urls = []
    try:
        html, final = get(base, binary=False)
        from urllib.parse import urljoin
        for m in re.finditer(r'<link[^>]+rel=["\'](?:apple-touch-icon[^"\']*|icon)["\'][^>]*>', html, re.I):
            tag = m.group(0)
            href = re.search(r'href=["\']([^"\']+)', tag)
            if href:
                size = re.search(r'sizes=["\'](\d+)x', tag)
                urls.append((int(size.group(1)) if size else 0, urljoin(final, href.group(1))))
        mani = re.search(r'<link[^>]+rel=["\']manifest["\'][^>]*href=["\']([^"\']+)', html, re.I)
        if mani:
            try:
                mdata, murl = get(urljoin(final, mani.group(1)), binary=False)
                mj = json.loads(mdata)
                for ic in mj.get("icons", []):
                    sz = int((ic.get("sizes") or "0x0").split("x")[0])
                    urls.append((sz, urljoin(murl, ic["src"])))
            except Exception:
                pass
        urls.append((0, urljoin(final, "/apple-touch-icon.png")))
    except Exception as e:
        print(f"  homepage fetch failed: {e}")
        urls.append((0, base.rstrip('/') + "/apple-touch-icon.png"))
    return [u for _, u in sorted(urls, key=lambda t: -t[0])]

def best_image(urls):
    best = None
    for u in urls[:8]:
        try:
            data, _ = get(u)
            im = Image.open(io.BytesIO(data))
            im.load()
            if im.width < 100:
                continue
            if best is None or im.width > best.width:
                best = im.convert("RGBA")
                if best.width >= 256:
                    break
        except Exception:
            continue
    return best

def save_square(im, path):
    side = max(im.width, im.height)
    pad = int(side * 0.08)
    canvas = Image.new("RGBA", (side + 2 * pad,) * 2, (0, 0, 0, 0))
    canvas.paste(im, (pad + (side - im.width) // 2, pad + (side - im.height) // 2), im)
    canvas = canvas.resize((256, 256), Image.LANCZOS)
    canvas.save(path, optimize=True)
    if os.path.getsize(path) > 40_000:
        canvas.quantize(colors=256, method=Image.FASTOCTREE).save(path, optimize=True)
    return os.path.getsize(path)

ok, skipped = [], []
for key, base in BANKS.items():
    print(f"== {key} ({base})")
    im = best_image(candidates(base))
    if im is None:
        skipped.append(key); print("  SKIPPED — no usable image"); continue
    size = save_square(im, f"{OUT}/{key}.png")
    ok.append(key); print(f"  saved {im.width}px source -> 256px, {size} bytes")
print("\nOK:", ok)
print("SKIPPED:", skipped)
