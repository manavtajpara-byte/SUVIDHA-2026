@echo off
echo SUVIDHA Kiosk GitHub Pusher
echo ==========================================
echo This script will push your code to: https://github.com/tajparamanav-ops/SUVIDHA-2026.git
echo.
cd /d "c:\Users\tajpa\OneDrive\Desktop\suvidha 2026"
git push -u origin main
echo.
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. You may need to sign in to GitHub in the prompt above.
) else (
    echo [SUCCESS] Code pushed successfully!
)
pause
