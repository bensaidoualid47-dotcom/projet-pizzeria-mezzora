import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from PIL import Image
import os

base = r'C:\Users\bensa\Downloads\Site web officel de mezzora\frontend\public\images\menu'

files = [(f, os.path.getsize(os.path.join(base, f))) for f in os.listdir(base)]
big = [(f, s) for f, s in files if s > 300000]

print(f"Compression de {len(big)} images lourdes...")

for fname, old_size in big:
    path = os.path.join(base, fname)
    try:
        img = Image.open(path)
        ext = fname.lower().split('.')[-1]

        # Redimensionner si > 800px
        w, h = img.size
        if max(w, h) > 800:
            ratio = 800 / max(w, h)
            img = img.resize((int(w*ratio), int(h*ratio)), Image.LANCZOS)

        if img.mode == 'RGBA' or ext == 'png':
            img.save(path, 'PNG', optimize=True)
        elif ext in ('jpg', 'jpeg'):
            if img.mode != 'RGB':
                img = img.convert('RGB')
            img.save(path, 'JPEG', quality=82, optimize=True)
        elif ext == 'webp':
            img.save(path, 'WEBP', quality=82, method=6)

        new_size = os.path.getsize(path)
        gain = 100 - new_size * 100 // old_size
        print(f"OK {fname[:45]:47} {old_size//1024:>5}KB -> {new_size//1024:>5}KB ({gain}% gain)")
    except Exception as e:
        print(f"ERR {fname}: {e}")

print("Termine!")
