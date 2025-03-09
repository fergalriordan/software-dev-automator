import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()

def query_deepseek(prompt):
    response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('DEEPSEEK_API_KEY')}",
        "Content-Type": "application/json",
    },
    data=json.dumps({
        "model": "deepseek/deepseek-r1:free", # seems to give empty responses, probably due to high traffic
        #"model": "deepseek/deepseek-chat:free",  # Alternative model
        "messages": [
        {
            "role": "user",
            "content": f'''You are an expert web developer. Generate a web development project based on the following prompt: {prompt}
                    
                    Your response should be a valid JSON object with the following structure:

                    {{
                        "project_name": "<project_name>",
                        "files": [
                            {{
                                "path": "<relative_path>", 
                                "content": "<file_content>"
                            }},
                            ...
                        ]
                    }}

                    - `project_name` should be a short, descriptive name based on the prompt. It should be an appropriate name for the parent directory.
                    - The `files` array should contain all necessary files for the project, including HTML, CSS, JavaScript, and any backend code if applicable.
                    - `path` should specify the relative directory structure (e.g., `"index.html"`, `"src/main.js"`, `"styles/style.css"`).
                    - `content` should contain the actual code for each file.
                    - Ensure that the generated code is functional, well-structured, and follows best practices.
                    - If a framework (e.g., React, Flask) is required based on the prompt, structure the project accordingly.
                    - Include a README file with instructions on how to run the project.
                    
                    Return only the JSON object with no extra explanation. Don't return the JSON object in markdown or other formats - just plain text in JSON format. Your output is being fed directly into a program, so it needs to be parsible as a valid JSON object.'''
        }
        ],
        
    })
    )

    try:
        data = response.json()  # Convert response to a dictionary
        project_json = json.loads(data["choices"][0]["message"]["content"])  # Parse the model's JSON output
        return project_json  # Now it's a proper Python dictionary
    except (json.JSONDecodeError, KeyError, IndexError) as e:
        print(f"Error parsing JSON: {e}")
        return None