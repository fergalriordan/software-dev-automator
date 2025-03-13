# Automating Web Development using the DeepSeek-R1 model through the DeepSeek API

### Project Overview

This project is focused on the creation of a tool for the automation of web development. The end goal is to produce a web page where a user simply inputs a natural language description of a web application, and then can download all the necessary code implementing this application.

### Backend
The back-end then takes the natural language user request and inputs it (with additional context) to the DeepSeek API. The DeepSeek model then creates a JSON file detailing all the necessary directories and code files to fulfil the user's request. The program then creates these files and directories and uploads them to the site. The user can then download the files to test and fine-tune the code.

### Frontend
The frontend will be implemented using Vite, React and TypeScript. This work is currently in progress.

### DeepSeek Query

Considerations:

- Prompt engineering
- Parameters (temperature, etc)
