@echo off
echo Démarrage du backend Mezzora Pizza...
cd /d "%~dp0backend"
call venv\Scripts\activate
uvicorn server:app --port 8001 --host 0.0.0.0
pause
