import re

with open('src/data.js', 'r') as f:
    content = f.read()

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

def replace_product(match):
    prefix = match.group(1)
    cat = match.group(2)
    suffix = match.group(3)
    
    img = cat_to_img.get(cat, '')
    if img:
        return f"{prefix}image: '{img}'{suffix}"
    return match.group(0)

# Regex: (category:\s*'([^']+)'[\s,]+)emoji:\s*'[^']+'(\s*})
new_content = re.sub(r"(category:\s*'([^']+)'[\s,]+)emoji:\s*'[^']+'(\s*})", replace_product, content)

def replace_category(match):
    cat_id = match.group(1)
    if cat_id in cat_to_img:
        return f"id: '{cat_id}', label: '{match.group(2)}', image: '{cat_to_img[cat_id]}'"
    elif cat_id == 'todo':
        return f"id: 'todo', label: 'Todo', image: '/images/vegetables.png'"
    return match.group(0)

new_content = re.sub(r"id:\s*'([^']+)',\s*label:\s*'([^']+)',\s*emoji:\s*'[^']+'", replace_category, new_content)

with open('src/data_updated.js', 'w') as f:
    f.write(new_content)
