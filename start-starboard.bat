@echo off
cd /d %~dp0
echo ====== Starboard Free v0.9.0 ======
echo.

node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo [エラー] Node.js が見つかりません。
  echo Node.js をインストールしてから、もう一度 start-starboard.bat を実行してください。
  echo.
  pause
  exit /b
)

if not exist dist\index.html (
  echo [エラー] dist/index.html が見つかりません。
  echo 配布用ファイルが不足している可能性があります。
  echo 開発環境の場合は npm run build を実行してください。
  echo.
  pause
  exit /b
)

echo Starboard Free を起動しています...
echo.
echo 操作画面:    http://localhost:3001
echo OBS Overlay: http://localhost:3001/overlay
echo.
echo 初回起動前に server フォルダで npm install を実行してください。
echo 起動中はこの画面を閉じないでください。
echo.

cd server
npm start

pause
