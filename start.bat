
@echo off
start /B ngrok http 8000

timeout /t 10 /nobreak

start node src/app.js

pause