@echo off
cd /d "%~dp0"

echo ====== Starboard Free v1.0.0 ======
echo.

node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js was not found.
  echo Please install Node.js, then run start-starboard.bat again.
  echo.
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo [ERROR] dist\index.html was not found.
  echo The distribution files may be incomplete.
  echo If this is a development environment, run npm run build first.
  echo.
  pause
  exit /b 1
)

if not exist "server\node_modules" (
  echo [ERROR] server dependencies were not found.
  echo Open the server folder and run: npm install
  echo.
  pause
  exit /b 1
)

echo Starting Starboard Free...
echo.
echo Control Panel: http://localhost:3001
echo OBS Overlay:   http://localhost:3001/overlay
echo.
echo Keep this window open while using Starboard Free.
echo.

cd /d "%~dp0server"
npm start

pause
