# software-dev-automator

### Project Overview

This project is focused on the creation of a tool for the automation of web development. The end goal is to produce the following:

Through a web front-end, the user inputs a natural language description of a website they wish to create. The back-end then takes this natural language request and inputs it (with additional context) to the DeepSeek API. The DeepSeek model then creates a JSON file detailing all the necessary directories and code files to fulfil the user's request. The program then creates these files and directories and uploads them to the site. The user can then download the files to test and fine-tune the code.


### DeepSeek Query

Considerations:

- Prompt engineering
- Parameters (temperature, etc)
