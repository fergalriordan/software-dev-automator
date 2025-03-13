from api_client import query_deepseek
from generator import create_project

import argparse
import json
import os

def main():
    parser = argparse.ArgumentParser(description='WebDev Auto-Generator')
    parser.add_argument('prompt', type=str, help='Your website description')
    parser.add_argument('--output_path', '-o', default='./output', help='Output directory')
    args = parser.parse_args()

    # Process prompt
    print(f"Generating project: {args.prompt}")
    
    # Deepseek API call
    project_json = query_deepseek(args.prompt)  # Already a dictionary

    # Ensure output directory exists
    if not os.path.exists(args.output_path):
        os.makedirs(args.output_path)

    if project_json: 
        output_file = os.path.join(args.output_path, 'project_structure.json')
        
        os.makedirs(args.output_path, exist_ok=True)

        with open(output_file, "w") as json_file:
            json.dump(project_json, json_file, indent=4)
        print(f"JSON file saved successfully to {output_file}!")
    else:
        print("Error: No valid project generated.")

    # Generate project
    create_project(output_file, args.output_path)

if __name__ == "__main__":
    main()
