echo Attempting to kill node.exe && ngrok.exe porccessses...
taskkill /F /IM node.exe
taskkill /F /IM ngrok.exe

@echo off
timeout /t 1 /nobreak
echo Going to C:\Users\y.tomchuk\Documents\CODEBASE\np_weights_bot...
cd /d "C:\Users\y.tomchuk\Documents\CODEBASE\np_weights_bot"

timeout /t 1 nobreak
echo Attempting to start ngrok.exe on port 8000...
start ngrok http 8000

timeout /t 1 /nobreak
echo Attempting to start node server...
start cmd /k "node src\app.js"

taskkill /F /IM cmd.exe

timeout /t 1 /nobreak
echo OK
timeout /t 1 /nobreak
