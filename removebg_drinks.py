"""
Supprime l'arrière-plan des images de boissons avec rembg.
Sauvegarde le résultat en PNG transparent dans le même dossier.
"""
from rembg import remove
from PIL import Image
import os

IMAGES_DIR = r"frontend\public\images\menu"

images_to_process = [
    ("dada-cola.jpg",               "dada_cola-removebg.png"),
    ("dada_melon.webp",             "dada_melon-removebg.png"),
    ("dada_peche.webp",             "dada_peche-removebg.png"),
    ("dada fraise.jpg",             "dada_fraise-removebg.png"),
    ("oasis_ice_tea_peche.png",     "oasis_ice_tea_peche-removebg.png"),
    ("Ice Tea Mangue Passion.jpg",  "ice_tea_mangue-removebg.png"),
    ("cristaline_peche.jpg",        "cristaline_peche-removebg.png"),
    ("breizh_cola_33cl.png",        "breizh_cola-33cl-removebg.png"),
    ("eau_gazeuse.jpg",             "eau_gazeuse-removebg.png"),
]

for src_name, dst_name in images_to_process:
    src = os.path.join(IMAGES_DIR, src_name)
    dst = os.path.join(IMAGES_DIR, dst_name)
    if not os.path.exists(src):
        print(f"  SKIP (introuvable) : {src_name}")
        continue
    try:
        with open(src, "rb") as f:
            input_data = f.read()
        output_data = remove(input_data)
        with open(dst, "wb") as f:
            f.write(output_data)
        print(f"  OK : {src_name} -> {dst_name}")
    except Exception as e:
        print(f"  ERREUR : {src_name} -> {e}")

print("\nTermine.")
