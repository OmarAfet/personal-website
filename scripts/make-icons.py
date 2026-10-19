"""Builds the favicon, icon and apple-icon from the KSA emblem.

Usage:
    python3 -I scripts/make-icons.py ~/Personal/People/Omar/Brand-Media/Logos/WHITE_KSA_LOGO.PNG

The source is a black emblem on a white square with wide margins. The emblem is
cropped to its bounds plus a small margin, so it stays readable at 16 px.
Decision 2026-10-19: Omar changed the favicon from his name logo to this emblem.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

APP = Path(__file__).resolve().parent.parent / "src/app"
MARGIN = 0.06  # of the emblem's longer side, on each side


def square_emblem(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    ink = ImageOps.invert(im.convert("L")).point(lambda v: 255 if v > 40 else 0)
    left, top, right, bottom = ink.getbbox()
    side = max(right - left, bottom - top)
    side += round(2 * MARGIN * side)
    cx, cy = (left + right) // 2, (top + bottom) // 2
    canvas = Image.new("RGB", (side, side), "white")
    canvas.paste(im.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)), (0, 0))
    return canvas


def main() -> None:
    src = Path(sys.argv[1]).expanduser()
    emblem = square_emblem(src)
    out = {
        "favicon.ico": None,
        "icon.png": 512,
        "apple-icon.png": 180,
    }
    # RGBA: Turbopack cannot decode RGB PNGs inside an .ico.
    emblem.convert("RGBA").save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    for name, size in out.items():
        if size:
            emblem.resize((size, size), Image.LANCZOS).save(APP / name, optimize=True)
    for name in out:
        print(f"wrote {APP / name}")


if __name__ == "__main__":
    main()
