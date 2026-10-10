"""Export the supplied Illustrator PDF logo with transparent, closely cropped bounds."""
import fitz

source = "attached_assets/Metter_of_medtech_logo1_1791623658215.ai"
document = fitz.open(source)
page = document[0]
bounds = fitz.Rect()
for drawing in page.get_drawings():
    color = drawing.get("fill")
    if color and min(color) < 0.9:
        bounds |= drawing["rect"]
if bounds.is_empty:
    raise ValueError("No logo artwork found")
bounds = bounds + (-5, -5, 5, 5)
page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=bounds, alpha=True).save(
    "artifacts/biolaunchpad/public/matter-of-medtech.png"
)
print(bounds)
