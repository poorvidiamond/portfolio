$ErrorActionPreference = "Stop"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Next.js Local Validation Pipeline" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Running Type Checking & Linter..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "Linting failed! Please fix formatting errors before deploying." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[2/3] Building Production Bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix TypeScript/compilation errors before pushing to Vercel." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[3/3] Build Successful! Starting Production Server..." -ForegroundColor Green
Write-Host "Opening your specialized production build at http://localhost:3000" -ForegroundColor Gray

Start-Process "http://localhost:3000"
npm start
