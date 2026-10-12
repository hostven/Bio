"""Export cropped, scalable logo variants from the original Illustrator artwork."""
from pathlib import Path
import re
import pymupdf

source = Path("attached_assets/Biolounchpad_logo1_1791800551692.ai")
page = pymupdf.open(source)[0]
bounds = pymupdf.Rect()
for drawing in page.get_drawings():
    bounds |= drawing["rect"]
bounds += (-1, -1, 1, 1)
svg = page.get_svg_image()
svg = re.sub(
    r'width="1000" height="1000" viewBox="0 0 1000 1000"',
    f'width="{bounds.width:g}" height="{bounds.height:g}" '
    f'viewBox="{bounds.x0:g} {bounds.y0:g} {bounds.width:g} {bounds.height:g}"',
    svg,
    count=1,
)
destination = Path("artifacts/biolaunchpad/public")
for name, color in (("logo-ivory", "#ffffff"), ("logo-forest", "#000000")):
    # All green paths retain their original exported fill. Only the default
    # black lettering changes with the background.
    output = svg.replace("<svg ", f'<svg fill="{color}" ', 1)
    (destination / f"{name}.svg").write_text(output)
print(f"Exported original vector artwork: {bounds.width:g} × {bounds.height:g}")
