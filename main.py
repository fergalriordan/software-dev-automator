from api_client import generate_code

import argparse

def main():
    parser = argparse.ArgumentParser(description='WebDev Auto-Generator')
    parser.add_argument('prompt', type=str, help='Your website description')
    parser.add_argument('--output', '-o', default='./output', help='Output directory')
    args = parser.parse_args()
    
    # Process prompt
    print(f"Generating project: {args.prompt}")
    # API call and generation logic
    structure = generate_code(args.prompt)
    print("Generated project structure: ", structure)

if __name__ == "__main__":
    main()