Write-Host "Starting Local CI/CD Pipeline..." -ForegroundColor Cyan

# 1. Lint
Write-Host "Step 1: Linting..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Error "Linting failed! Please fix the errors before proceeding."
    exit $LASTEXITCODE
}
Write-Host "Linting passed." -ForegroundColor Green

# 2. Build
Write-Host "Step 2: Building..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed! Please check the build output."
    exit $LASTEXITCODE
}
Write-Host "Build successful." -ForegroundColor Green

# 3. Start and Open
Write-Host "Step 3: Starting server and opening browser..." -ForegroundColor Green
Write-Host "Opening http://localhost:3000 in your default browser..."
Start-Process "http://localhost:3000"

Write-Host "Starting Next.js server..."
npm start
