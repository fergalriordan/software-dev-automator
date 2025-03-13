# generate the directory structure and files based on the json data
import json
import os

def create_project(file, path):
    # read the json file
    with open(file, 'r') as f:
        data = json.load(f)

    parent_dir = path + "/"+ data['project_name']
    os.makedirs(parent_dir, exist_ok=True)

    # create the directory structure
    for file in data['files']:
        path = os.path.join(parent_dir, file['path'])
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(file['content'])
