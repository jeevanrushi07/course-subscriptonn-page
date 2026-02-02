@echo off
echo ========================================
echo Pushing Code to GitHub
echo ========================================
echo.
echo Make sure you've created the repository on GitHub first!
echo Repository URL: https://github.com/jeevanrushi07/course-subscription-app
echo.
pause
echo.
echo Adding remote origin...
git remote add origin https://github.com/jeevanrushi07/course-subscription-app.git
echo.
echo Pushing code to GitHub...
git push -u origin main
echo.
echo ========================================
echo Done! Check your GitHub repository
echo ========================================
pause

