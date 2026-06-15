import re
from pathlib import Path
root = Path('frontend')
menu = root / 'src' / 'data' / 'menuData.js'
text = menu.read_text(encoding='utf-8')
imgs = re.findall(r'image\s*:\s*["\']([^"\']+)["\']', text)
files = {p.as_posix() for p in (root/'public'/'images'/'menu').iterdir() if p.is_file()}
missing = [img for img in sorted(set(imgs)) if img.lstrip('/') not in files]
print('total refs', len(imgs), 'unique', len(set(imgs)))
print('missing', len(missing))
for m in missing:
    print(m)
