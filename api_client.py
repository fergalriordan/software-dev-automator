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
        #"model": "deepseek/deepseek-r1:free", # seems to give empty responses, probably due to high traffic
        "model": "deepseek/deepseek-chat:free",  # Alternative model
        "messages": [
        {
            "role": "user",
            "content": f"{prompt}"
        }
        ],
        
    })
    )

    return response