import io, json, os, re, subprocess
from PIL import Image
import cairosvg

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
OUT = "/app/frontend/public/assets/banks"

TARGETS = {
    "bask": ["https://www.baskbank.com"],
    "marcus": ["https://www.marcus.com/us/en"],
    "barclays": ["https://www.banking.barclaysus.com", "https://home.barclays"],
    "bread": ["https://www.breadfinancial.com", "https://savings.breadfinancial.com"],
    "quontic": ["https://www.quontic.com", "https://quontic.com"],
    "bmoalto": ["https://alto.bmo.com", "https://www.bmo.com"],
    "cit": ["https://www.cit.com", "https://www.cit.com/cit-bank"],
    "suncoast": ["https://www.suncoastcreditunion.com", "https://suncoastcreditunion.com"],
}
EXTRA = ["/apple-touch-icon.png", "/apple-touch-icon-precomposed.png", "/android-chrome-512x512.png",
         "/android-chrome-192x192.png", "/favicon-196x196.png", "/favicon.svg", "/icons/apple-touch-icon.png",
         "/assets/favicons/apple-touch-icon.png", "/favicon-32x32.png"]

def curl(url, timeout=20):
    r = subprocess.run(["curl", "-sL", "--max-time", str(timeout), "-A", UA,
                        "-H", "Accept: text/html,image/*,*/*", url], capture_output=True)
    return r.stdout if r.returncode == 0 else b""

def to_image(data, src_url):
    if not data:
        return None
    if data[:200].lstrip()[:4] in (b"<svg", b"<?xm") or src_url.endswith(".svg"):
        try:
            png = cairosvg.svg2png(bytestring=data, output_width=512, output_height=512)
            return Image.open(io.BytesIO(png)).convert("RGBA")
        except Exception:
            return None
    try:
        im = Image.open(io.BytesIO(data)); im.load()
        return im.convert("RGBA")
    except Exception:
        return None

def html_candidates(base):
    html = curl(base).decode("utf-8", "ignore")
    from urllib.parse import urljoin
    out = []
    for m in re.finditer(r'<link[^>]+rel=["\'](?:apple-touch-icon[^"\']*|icon|mask-icon)["\'][^>]*>', html, re.I):
        href = re.search(r'href=["\']([^"\']+)', m.group(0))
        if href:
            size = re.search(r'sizes=["\'](\d+)x', m.group(0))
            out.append((int(size.group(1)) if size else (400 if href.group(1).endswith(".svg") else 0),
                        urljoin(base, href.group(1))))
    mani = re.search(r'<link[^>]+rel=["\']manifest["\'][^>]*href=["\']([^"\']+)', html, re.I)
    if mani:
        try:
            mj = json.loads(curl(urljoin(base, mani.group(1))).decode("utf-8", "ignore"))
            for ic in mj.get("icons", []):
                sz = int((ic.get("sizes") or "0x0").split("x")[0])
                out.append((sz, urljoin(base, ic["src"])))
        except Exception:
            pass
    return [u for _, u in sorted(out, key=lambda t: -t[0])]

def save_square(im, path):
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    side = max(im.width, im.height)
    pad = int(side * 0.08) or 4
    canvas = Image.new("RGBA", (side + 2 * pad,) * 2, (0, 0, 0, 0))
    canvas.paste(im, (pad + (side - im.width) // 2, pad + (side - im.height) // 2), im)
    canvas = canvas.resize((256, 256), Image.LANCZOS)
    canvas.save(path, optimize=True)
    if os.path.getsize(path) > 40_000:
        canvas.quantize(colors=256, method=Image.FASTOCTREE).save(path, optimize=True)
    return os.path.getsize(path)

ok, skipped = [], []
for key, bases in TARGETS.items():
    print(f"== {key}")
    best = None
    urls = []
    for b in bases:
        urls += html_candidates(b)
        urls += [b.rstrip("/") + p for p in EXTRA]
    seen = set()
    for u in urls:
        if u in seen: continue
        seen.add(u)
        im = to_image(curl(u), u)
        if im is None or im.width < 96:
            continue
        if best is None or im.width > best.width:
            best = im
            print(f"  candidate {im.width}px: {u[:90]}")
        if best.width >= 256:
            break
    if best is None:
        skipped.append(key); print("  SKIPPED")
        continue
    size = save_square(best, f"{OUT}/{key}.png")
    ok.append(key); print(f"  saved -> 256px, {size} bytes")
print("\nOK:", ok)
print("SKIPPED:", skipped)
