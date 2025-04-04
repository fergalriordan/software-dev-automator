from api_client import query_deepseek
from generator import create_project

from flask import Flask, request, jsonify, send_from_directory
import os
import json
import shutil

app = Flask(__name__)
from flask_cors import CORS
CORS(app)

OUTPUT_DIR = "./output"
ZIP_FILE = os.path.join(OUTPUT_DIR, 'project.zip')

@app.route('/')
def home():
    return "Welcome to the backend API! The Flask app is running successfully."

@app.route('/generate', methods=['POST'])
def generate_project():
    data = request.get_json()

    if not data or 'prompt' not in data:
        return jsonify({'error': 'Missing prompt'}), 400

    prompt = data['prompt']
    print(f"Generating project for prompt: {prompt}")

    project_json = query_deepseek(prompt)
    if not project_json:
        return jsonify({'error': 'DeepSeek API returned an empty response'}), 400

    # Ensure output directory exists and is clean
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    output_file = os.path.join(OUTPUT_DIR, 'project_structure.json')

    with open(output_file, "w") as json_file:
        json.dump(project_json, json_file, indent=4)

    create_project(output_file, OUTPUT_DIR)

    # Create ZIP from the project directory only, not the entire OUTPUT_DIR
    project_dir = os.path.join(OUTPUT_DIR, project_json['project_name'])
    
    # Ensure old ZIP file isn't included in new one
    if os.path.exists(ZIP_FILE):
        os.remove(ZIP_FILE)
    
    # Create zip from just the project directory
    shutil.make_archive(ZIP_FILE.replace('.zip', ''), 'zip', project_dir)

    return jsonify({'message': 'Project generated successfully', 'download_url': "/output/project.zip"}), 200


@app.route('/output/<path:filename>', methods=['GET'])
def download_file(filename):
    #return send_from_directory(OUTPUT_DIR, filename, as_attachment=True)
    return send_from_directory(os.path.abspath(OUTPUT_DIR), filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
