@echo off
echo ===================================================
echo   Pushing SUVIDHA 2026 to GitHub
echo ===================================================
echo.

set /p repo_url="Enter your GitHub Repository URL: "

echo.
echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Initial sovereign launch v1.0.0 - Complete Feature Set"

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Adding remote origin...
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ===================================================
echo   Done! Your code is now on GitHub.
echo ===================================================
pause
