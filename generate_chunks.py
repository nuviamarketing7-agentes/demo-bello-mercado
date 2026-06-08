import json

with open('src/data.js', 'r') as f:
    lines = f.readlines()

cat_to_img = {
    'carniceria': '/images/meat.png',
    'fiambreria': '/images/deli.png',
    'pollos': '/images/poultry.png',
    'cerdo': '/images/pork.png',
    'pescados': '/images/fish.png',
    'verduras': '/images/vegetables.png',
    'lacteos': '/images/dairy.png',
    'bebidas': '/images/beverages.png',
    'envasados': '/images/packaged.png',
    'panaderia': '/images/bakery.png',
    'congelados': '/images/frozen.png',
    'limpieza': '/images/cleaning.png',
    'higiene': '/images/hygiene.png',
    'lenya': '/images/charcoal.png'
}

chunks = []

# chunk for CATEGORIES
cat_start = -1
for i, line in enumerate(lines):
    if line.startswith('export const CATEGORIES = ['):
        cat_start = i + 1
    elif line.startswith('];') and cat_start != -1:
        cat_end = i
        break

target_cat = "".join(lines[cat_start:cat_end])
replace_cat = target_cat
for cat_id, img in cat_to_img.items():
    import re
    replace_cat = re.sub(rf"id:\s*'{cat_id}',\s*label:\s*'([^']+)',\s*emoji:\s*'[^']+'", rf"id: '{cat_id}', label: '\g<1>', image: '{img}'", replace_cat)
replace_cat = re.sub(r"id:\s*'todo',\s*label:\s*'Todo',\s*emoji:\s*'[^']+'", f"id: 'todo', label: 'Todo', image: '/images/vegetables.png'", replace_cat)

chunks.append({
    "StartLine": cat_start + 1,
    "EndLine": cat_end,
    "TargetContent": target_cat,
    "ReplacementContent": replace_cat,
    "AllowMultiple": False
})

# chunks for PRODUCTS, group by category comments
prod_start = -1
current_chunk_start = -1
current_target = ""
current_replace = ""

for i, line in enumerate(lines):
    if line.startswith('export const PRODUCTS = ['):
        prod_start = i + 1
        current_chunk_start = i + 1
    elif prod_start != -1:
        if line.startswith('];'):
            # flush last chunk
            chunks.append({
                "StartLine": current_chunk_start + 1,
                "EndLine": i,
                "TargetContent": current_target,
                "ReplacementContent": current_replace,
                "AllowMultiple": False
            })
            break
        elif line.strip().startswith('// =====================') and current_target:
            # flush chunk
            chunks.append({
                "StartLine": current_chunk_start + 1,
                "EndLine": i,
                "TargetContent": current_target,
                "ReplacementContent": current_replace,
                "AllowMultiple": False
            })
            current_chunk_start = i
            current_target = line
            current_replace = line
        else:
            current_target += line
            # replace in line
            r_line = line
            import re
            r_line = re.sub(r"(category:\s*'([^']+)'[\s,]+)emoji:\s*'[^']+'(\s*})", lambda m: f"{m.group(1)}image: '{cat_to_img.get(m.group(2), '')}'{m.group(3)}" if m.group(2) in cat_to_img else m.group(0), r_line)
            current_replace += r_line

with open('chunks.json', 'w') as f:
    json.dump(chunks, f, indent=2)

