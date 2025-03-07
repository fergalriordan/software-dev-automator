import os
import json
from pathlib import Path

def generate_project(structure, output_dir):
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    for item in structure:
        path = os.path.join(output_dir, item['name'])
        if item['type'] == 'directory':
            os.makedirs(path, exist_ok=True)
        elif item['type'] == 'file':
            with open(path, 'w') as f:
                f.write(item.get('content', ''))

def create_readme(content, output_dir):
    with open(os.path.join(output_dir, 'README.md'), 'w') as f:
        f.write(content)