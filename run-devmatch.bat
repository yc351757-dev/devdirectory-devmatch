@echo off
cd /d %~dp0
echo Installing project packages (first run only)...
npm install
if errorlevel 1 (
  pause
  exit /b 1
)
echo Starting DevMatch...
npm run dev
pause
