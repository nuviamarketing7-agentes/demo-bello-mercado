import json

with open('src/data.js', 'r') as f:
    old_content = f.read()
    
with open('src/data_updated.js', 'r') as f:
    new_content = f.read()
    
# Find the exact strings
import re
old_cat_match = re.search(r'export const CATEGORIES = \[\n.*?\];', old_content, re.DOTALL)
new_cat_match = re.search(r'export const CATEGORIES = \[\n.*?\];', new_content, re.DOTALL)

old_prod_match = re.search(r'export const PRODUCTS = \[\n.*?\];', old_content, re.DOTALL)
new_prod_match = re.search(r'export const PRODUCTS = \[\n.*?\];', new_content, re.DOTALL)

print("CAT OLD LINES:", old_content.count('\n', 0, old_cat_match.start()) + 1, "-", old_content.count('\n', 0, old_cat_match.end()) + 1)
print("PROD OLD LINES:", old_content.count('\n', 0, old_prod_match.start()) + 1, "-", old_content.count('\n', 0, old_prod_match.end()) + 1)
