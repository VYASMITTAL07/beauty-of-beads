#!/bin/bash
# The html-inline step in bundle-artifact.sh strips the <head> (including the
# <meta name="viewport"> tag) from bundle.html. Without it, real mobile
# browsers render the page at a virtual ~980px desktop-width viewport instead
# of the actual device width, so every `sm:`/`md:` mobile-vs-desktop
# Tailwind breakpoint permanently evaluates as "desktop" on a real phone.
# Run this immediately after every bundle-artifact.sh build.
set -e
cd "$(dirname "$0")"
python3 -c "
with open('bundle.html', 'r', encoding='utf-8') as f:
    content = f.read()

marker = '<html lang=en>'
idx = content.find(marker)
assert idx != -1, 'marker not found'
if '<meta name=\"viewport\"' in content[:500]:
    print('viewport meta already present, skipping')
else:
    insert_pos = idx + len(marker)
    meta = '<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head>'
    content = content[:insert_pos] + meta + content[insert_pos:]
    with open('bundle.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('viewport meta re-inserted into bundle.html')
"
