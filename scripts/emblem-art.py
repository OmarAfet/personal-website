"""Render a black-on-white emblem PNG as half-block text art (▀ ▄ █).
Usage: python3 -I scripts/emblem-art.py <png> <columns> [threshold]
Each text cell holds two vertical pixels, so cells are square at 8x16 fonts."""
import sys
from PIL import Image, ImageOps

src, cols = sys.argv[1], int(sys.argv[2])
thr = int(sys.argv[3]) if len(sys.argv) > 3 else 128
im = Image.open(src).convert("L")
inv = ImageOps.invert(im)                    # emblem -> white, background -> black
box = inv.point(lambda v: 255 if v > 40 else 0).getbbox()
im = im.crop(box)
w, h = im.size
rows_px = round(cols * h / w)
rows_px += rows_px % 2                       # even pixel rows -> whole cells
im = im.resize((cols, rows_px), Image.LANCZOS)
px = im.load()
out = []
for y in range(0, rows_px, 2):
    line = ""
    for x in range(cols):
        top = px[x, y] < thr
        bot = px[x, y + 1] < thr
        line += "█" if top and bot else "▀" if top else "▄" if bot else " "
    out.append(line.rstrip())
print("\n".join(out))
print(f"# {cols} cols x {rows_px // 2} rows, crop box {box}", file=sys.stderr)
