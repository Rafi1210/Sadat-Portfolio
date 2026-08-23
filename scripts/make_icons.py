"""
Generate the favicon family + apple-touch-icon from a single brand mark.

Design matches /public/favicon.svg:
  - rounded rect background, fill #111318 (ink)
  - bold "R" letter centered, fill #F7F8FA (bg)

Outputs (overwriting if present):
  public/favicon-16x16.png
  public/favicon-32x32.png
  public/favicon.ico          (multi-resolution: 16, 32, 48)
  public/apple-touch-icon.png (180x180, full bleed, no rounded clip — iOS adds its own)
"""

from PIL import Image, ImageDraw, ImageFont

INK = (17, 19, 24, 255)
BG = (247, 248, 250, 255)


def find_font(size):
    # Try a few common bold sans fonts. Fall back to default.
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf",  # Segoe UI Bold
        r"C:\Windows\Fonts\arialbd.ttf",  # Arial Bold
        r"C:\Windows\Fonts\calibrib.ttf",  # Calibri Bold
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def render(size, *, rounded=True, corner_frac=0.22):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if rounded:
        radius = max(2, int(size * corner_frac))
        draw.rounded_rectangle(
            [(0, 0), (size - 1, size - 1)],
            radius=radius,
            fill=INK,
        )
    else:
        draw.rectangle([(0, 0), (size - 1, size - 1)], fill=INK)

    # Bold "R" centered. Font size scales with the canvas.
    font_size = int(size * 0.66)
    font = find_font(font_size)
    text = "R"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=BG)
    return img


def main():
    out = r"C:\Users\Rafi\OneDrive\Documents\Resumes\Sadat-Portfolio\public"

    # 16
    img16 = render(16, rounded=True, corner_frac=0.22)
    img16.save(f"{out}\\favicon-16x16.png", "PNG")

    # 32
    img32 = render(32, rounded=True, corner_frac=0.22)
    img32.save(f"{out}\\favicon-32x32.png", "PNG")

    # 180 apple-touch-icon (full bleed; iOS applies its own corner mask)
    img180 = render(180, rounded=False)
    img180.save(f"{out}\\apple-touch-icon.png", "PNG")

    # favicon.ico with multiple resolutions
    img48 = render(48, rounded=True, corner_frac=0.22)
    img16_ico = render(16, rounded=True, corner_frac=0.22)
    img32_ico = render(32, rounded=True, corner_frac=0.22)
    img32_ico.save(
        f"{out}\\favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[img16_ico, img48],
    )

    print("wrote: favicon-16x16.png, favicon-32x32.png, favicon.ico, apple-touch-icon.png")


if __name__ == "__main__":
    main()
