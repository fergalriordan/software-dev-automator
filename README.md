# software-dev-automator

### Project Overview

This project is focused on the creation of a tool for the automation of web development. The end goal is to produce a program that can take a natural language prompt from the user outlining a set of instructions for a website. The program then queries the DeepSeek model through the DeepSeek API (using a free OpenRouter API key), instructing it to provide a JSON file containing all the necessary directories and code files for the website. The program then processes this JSON to generate the files in an output directory on the user's device.

### API Key

Replace .env.example file with a real .env file containing a valid DeepSeek API key (use OpenRouter for a free key)
git s
### Virtual Environment Notes

- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
- .\venv\Scripts\Activate.ps1
- pip install requests python-dotenv
