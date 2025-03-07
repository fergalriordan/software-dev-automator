import os
import requests
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

def generate_code(prompt):
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "deepseek-chat",  # Or "deepseek-reasoner"
        "messages": [
            {
                "role": "user",
                "content": f"""You are a web development expert, capable of generating, sleek, modern and user-friendly web applications.
                Generate a web project structure in JSON format based on this prompt:
                {prompt}
                
                Required format:
                {{
                    "structure": [
                        {{"type": "directory", "name": "..."}},
                        {{"type": "file", "name": "...", "content": "..."}}
                    ],
                    "readme": "...",
                    "dependencies": ["..."]
                }}
                Your response should be valid JSON, with no additional supporting text - the response is being fed directly into a program on my end, so any supporting text will cause issues.
                """
            }
        ],
        "temperature": 0.3
    }
    
    response = requests.post(DEEPSEEK_API_URL, json=payload, headers=headers)
    return response.json()