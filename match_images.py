import re
from pathlib import Path
import unicodedata
root = Path('frontend')
menu = root / 'src' / 'data' / 'menuData.js'
text = menu.read_text(encoding='utf-8')
imgs = re.findall(r'image\s*:\s*["\']([^"\']+)["\']', text)
files = [p.as_posix() for p in (root/'public'/'images'/'menu').iterdir() if p.is_file()]
if not files:
    raise SystemExit('no files')
files_norm = {}
def norm(s):
    s = s.replace(' ', '').replace('-', '').replace('_','').lower()
    s = ''.join(ch for ch in unicodedata.normalize('NFKD', s) if not unicodedata.combining(ch))
    return s
for f in files:
    files_norm[norm(f)] = f
missing = [img for img in sorted(set(imgs)) if img.lstrip('/') not in files]
print('total refs', len(imgs), 'unique', len(set(imgs)))
print('missing', len(missing))
for img in missing:
    key = norm(img.lstrip('/'))
    print('REF', img)
    print(' ->', files_norm.get(key, 'no match'))
