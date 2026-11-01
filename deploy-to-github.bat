@REM Copyright (C) 2026 Lenovo
@REM All Rights Reserved.
@REM Lenovo Confidential Restricted.
@echo off
setlocal

cd /d "%~dp0"
set "REPO_URL=%~1"
if "%REPO_URL%"=="" set /p "REPO_URL=GitHub repository URL (for example https://github.com/name/kids-news-player.git): "
if "%REPO_URL%"=="" (
  echo A GitHub repository URL is required.
  exit /b 1
)

if not exist ".git" (
  git init
  git branch -M main
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REPO_URL%"
) else (
  git remote set-url origin "%REPO_URL%"
)

git add .
git diff --cached --quiet
if errorlevel 1 git commit -m "Publish kids audio player"
git push -u origin main
echo Pushed. Enable GitHub Pages with GitHub Actions as the source; the workflow will deploy the site and refresh it twice daily.
endlocal
