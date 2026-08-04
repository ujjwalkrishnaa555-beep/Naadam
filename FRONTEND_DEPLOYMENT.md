# Naadam Frontend Deployment Configuration

## Environment Variables

### Production
```env
REACT_APP_API_URL=https://naadam-api.herokuapp.com/api
REACT_APP_ENV=production
```

### Development
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "echo 'Static site - no build needed'",
  "outputDirectory": ".",
  "env": {
    "API_BASE_URL": "@api_base_url"
  }
}
```

## Netlify Configuration (netlify.toml)

```toml
[build]
  command = "echo 'Static site'"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index-integrated.html"
  status = 200

[env]
  [env.production]
    API_BASE_URL = "https://naadam-api.herokuapp.com/api"
  [env.development]
    API_BASE_URL = "http://localhost:5000/api"
```

## GitHub Pages Deployment

Add to repository settings:
- Source: GitHub Actions
- Workflow: Deploy to Pages

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        run: |
          # Copy files to docs folder
          mkdir -p docs
          cp *.html docs/
          cp *.js docs/
          cp *.css docs/
          cp *.svg docs/
```
