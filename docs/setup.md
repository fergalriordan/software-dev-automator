### API Key

Replace .env.example file with a real .env file containing a valid DeepSeek API key (use OpenRouter for a free key)

- Note that the R1 model may sometimes provide an empty response (presumably due to high traffic). In this case, change the model to the alternative included as a comment in the code.

### Frontend (Windows instructions)

- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
- .\venv\Scripts\Activate.ps1
- pip install requests python-dotenv
- npm run dev

### Backend

- python backend/server.py

### API Key

- Replace the .env.example file with a real.env file that contains a real DeepSeek API key. This can be obtained for free from OpenRouter.
