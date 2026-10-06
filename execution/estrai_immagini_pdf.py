"""Estrae le immagini raster da un PDF e le salva come JPEG ottimizzati per il web.

Uso:
    python3 execution/estrai_immagini_pdf.py <file.pdf> <cartella_output> [--max 1600] [--quality 80]
    python3 execution/estrai_immagini_pdf.py <file.pdf> <cartella_output> --map mappa.json

Senza --map salva tutte le immagini JPEG come p<pagina>_<indice>.jpg (utile per vederle).
Con --map salva solo quelle elencate nel JSON, rinominate e ruotate:
    {"p01_0": {"name": "panorama-1913", "rotate": 0}, ...}
"rotate" è in gradi in senso orario. Le PNG dei PDF impaginati sono di solito
maschere/cornici: vengono ignorate se non sono esplicitamente nella mappa.

Richiede: pip install pypdf pillow
"""
import argparse
import io
import json
import os

import pypdf
from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("out")
    ap.add_argument("--max", type=int, default=1600, help="lato lungo massimo in px")
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--map", help="JSON {chiave: {name, rotate}}")
    args = ap.parse_args()

    mapping = json.load(open(args.map)) if args.map else None
    os.makedirs(args.out, exist_ok=True)
    reader = pypdf.PdfReader(args.pdf)

    for i, page in enumerate(reader.pages):
        for j, img in enumerate(page.images):
            key = f"p{i + 1:02d}_{j}"
            if mapping is not None:
                if key not in mapping:
                    continue
                name = mapping[key]["name"]
                rotate = mapping[key].get("rotate", 0)
            else:
                if not img.name.lower().endswith((".jpg", ".jpeg")):
                    continue
                name, rotate = key, 0

            im = Image.open(io.BytesIO(img.data)).convert("RGB")
            if rotate:
                im = im.rotate(-rotate, expand=True)
            im.thumbnail((args.max, args.max), Image.LANCZOS)
            dest = os.path.join(args.out, f"{name}.jpg")
            im.save(dest, "JPEG", quality=args.quality, optimize=True, progressive=True)
            print(f"{key} -> {dest} {im.size} {os.path.getsize(dest) // 1024} KB")


if __name__ == "__main__":
    main()
