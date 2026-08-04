# GitHub Actions - Automated Deployment

## 🤖 Auto-Deploy on Push

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Naadam

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "naadam-api"
          heroku_email: "your-email@gmail.com"
          usedocker: false
          
      - name: Notify on Success
        run: echo "✅ Deployment successful!"
```

## 🔐 Setup Secrets

1. Go to Repository Settings
2. Click "Secrets and variables" → "Actions"
3. Add secrets:
   - `HEROKU_API_KEY`
   - `HEROKU_EMAIL`
   - `MONGODB_URI`

## 📝 Testing Workflow

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd backend && npm install
      
      - name: Run tests
        run: cd backend && npm test
        env:
          MONGODB_URI: mongodb://localhost:27017/naadam-test
```

## 📦 Build Workflow

```yaml
name: Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          cd backend
          docker build -t naadam-api:latest .
      
      - name: Push to registry
        run: |
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push naadam-api:latest
```
