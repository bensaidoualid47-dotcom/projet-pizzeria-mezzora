from pathlib import Path
import difflib
import unicodedata

root = Path('frontend')
text = (root / 'src' / 'data' / 'menuData.js').read_text(encoding='utf-8')
imgs = [part.strip() for part in text.split('image:')[1:]]
imgs = [s[1:s.find(s[0], 1)] for s in imgs]
files = [p.name for p in (root / 'public' / 'images' / 'menu').iterdir() if p.is_file()]

norm = lambda s: ''.join(
    ch for ch in unicodedata.normalize('NFKD', s.replace(' ', '').replace('-', '').replace('_', '').lower())
    if not unicodedata.combining(ch)
)
files_norm = {norm(f): f for f in files}
keys = list(files_norm.keys())
for img in sorted(set(imgs)):
    name = Path(img.lstrip('/')).name
    if name in files:
        continue
    n = norm(name)
    matches = difflib.get_close_matches(n, keys, n=5, cutoff=0.5)
    print('REF', img)
    if matches:
        for m in matches:
            print('  ', files_norm[m])
    else:
        print('  no close match')
