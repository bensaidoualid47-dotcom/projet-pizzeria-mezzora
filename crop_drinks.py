"""
Recadre automatiquement l'espace transparent autour des images de boissons.
Résultat : toutes les canettes/bouteilles apparaissent à la même taille visuelle.
"""
from PIL import Image
import os

IMAGES_DIR = r"frontend\public\images\menu"
PADDING = 10  # pixels de marge à garder autour du contenu

# Images de boissons à traiter (fichiers -removebg-preview.png)
drink_images = [f for f in os.listdir(IMAGES_DIR) if 'removebg' in f.lower() and f.endswith('.png')]

processed = 0
skipped = 0

for filename in drink_images:
    path = os.path.join(IMAGES_DIR, filename)
    try:
        img = Image.open(path).convert("RGBA")

        # Trouve le bounding box du contenu non-transparent
        bbox = img.getbbox()
        if bbox is None:
            print(f"  SKIP (vide) : {filename}")
            skipped += 1
            continue

        # Ajoute une marge autour du contenu
        left   = max(0, bbox[0] - PADDING)
        top    = max(0, bbox[1] - PADDING)
        right  = min(img.width,  bbox[2] + PADDING)
        bottom = min(img.height, bbox[3] + PADDING)

        cropped = img.crop((left, top, right, bottom))
        cropped.save(path, "PNG")

        orig_w, orig_h = img.size
        new_w, new_h   = cropped.size
        print(f"  OK : {filename}  ({orig_w}x{orig_h} → {new_w}x{new_h})")
        processed += 1

    except Exception as e:
        print(f"  ERREUR : {filename} — {e}")
        skipped += 1

print(f"\nTerminé : {processed} image(s) recadrée(s), {skipped} ignorée(s).")
