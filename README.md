# software-dev-automator

### Project Overview

This project is focused on the creation of a tool for the automation of web development. The end goal is to produce the following:

Through a web front-end, the user inputs a natural language description of a website they wish to create. The back-end then takes this natural language request and inputs it (with additional context) to the DeepSeek API. The DeepSeek model then creates a JSON file detailing all the necessary directories and code files to fulfil the user's request. The program then creates these files and directories and uploads them to the site. The user can then download the files to test and fine-tune the code.

### API Key

Replace .env.example file with a real .env file containing a valid DeepSeek API key (use OpenRouter for a free key)

- Note that the R1 model may sometimes provide an empty response (presumably due to high traffic). In this case, change the model to the alternative included as a comment in the code.

### Virtual Environment Notes

- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
- .\venv\Scripts\Activate.ps1
- pip install requests python-dotenv

### DeepSeek Query

Considerations:

- Prompt engineering
- Parameters (temperature, etc)
