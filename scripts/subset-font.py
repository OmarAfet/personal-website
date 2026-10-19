"""Subsets the IBM VGA 8x16 web font to the characters the site can show and
writes it as WOFF2, the file every page loads first.

Usage (needs fontTools and brotli: pip install fonttools brotli):
    python3 -I scripts/subset-font.py

Kept: printable ASCII and Latin-1 (anything a visitor can type in the shell),
general punctuation, arrows, box drawing, block elements and geometric shapes.
Dropped: the Latin Extended, Greek and Cyrillic glyphs of the "Plus" font.
22.6 KB WOFF -> about 6 KB WOFF2 (2026-10-19, for Lighthouse mobile LCP).
The full WOFF stays for the Open Graph image (satori cannot read WOFF2).
The subset is an adaptation of a CC BY-SA 4.0 font, so it stays CC BY-SA 4.0.
"""

from pathlib import Path

from fontTools import subset

FONTS = Path(__file__).resolve().parent.parent / "src/app/fonts"
SOURCE = FONTS / "WebPlus_IBM_VGA_8x16.woff"
TARGET = FONTS / "WebPlus_IBM_VGA_8x16-subset.woff2"

RANGES = [
    (0x0020, 0x007E),  # ASCII
    (0x00A0, 0x00FF),  # Latin-1
    (0x2010, 0x2027),  # dashes, quotes, bullet, ellipsis
    (0x2190, 0x21FF),  # arrows
    (0x2500, 0x259F),  # box drawing, block elements
    (0x25A0, 0x25FF),  # geometric shapes
    (0x2713, 0x2713),  # check mark
]


def main() -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = []
    options.name_IDs = ["*"]  # keep the copyright and license names
    font = subset.load_font(str(SOURCE), options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=[u for a, b in RANGES for u in range(a, b + 1)])
    subsetter.subset(font)
    subset.save_font(font, str(TARGET), options)
    print(f"{SOURCE.name} {SOURCE.stat().st_size} B -> {TARGET.name} {TARGET.stat().st_size} B")


if __name__ == "__main__":
    main()
