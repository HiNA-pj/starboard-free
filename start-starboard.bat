@echo off
cd /d %~dp0
echo Starting Starboard Free...
echo.
echo If this is your first time, please run npm install before starting.
echo.
npm run dev:all
pause