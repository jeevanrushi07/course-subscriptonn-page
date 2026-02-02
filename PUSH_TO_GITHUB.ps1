Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pushing Code to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Make sure you've created the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "Repository URL: https://github.com/jeevanrushi07/course-subscription-app" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to continue"

Write-Host ""
Write-Host "Adding remote origin..." -ForegroundColor Green
git remote add origin https://github.com/jeevanrushi07/course-subscription-app.git

Write-Host ""
Write-Host "Pushing code to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Done! Check your GitHub repository" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

