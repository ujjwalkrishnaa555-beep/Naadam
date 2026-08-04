#!/bin/bash

# Naadam Automatic Deployment Script

echo "🎵 Naadam Music App - Deployment Script"
echo "======================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check prerequisites
echo ""
echo "Checking prerequisites..."

if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    exit 1
fi
print_status "Git installed"

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_status "Node.js installed"

# Ask for deployment platform
echo ""
echo "Which platform do you want to deploy to?"
echo "1) Heroku"
echo "2) Render"
echo "3) Railway"
read -p "Enter your choice (1-3): " platform

case $platform in
    1)
        print_info "Deploying to Heroku..."
        
        if ! command -v heroku &> /dev/null; then
            print_error "Heroku CLI is not installed"
            print_info "Install from: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        read -p "Enter Heroku app name: " app_name
        
        print_info "Creating Heroku app..."
        heroku create $app_name
        
        read -p "Enter MongoDB URI: " mongo_uri
        read -p "Enter JWT Secret: " jwt_secret
        
        print_info "Setting environment variables..."
        heroku config:set MONGODB_URI="$mongo_uri"
        heroku config:set JWT_SECRET="$jwt_secret"
        heroku config:set NODE_ENV="production"
        
        print_info "Deploying..."
        git push heroku main
        
        print_status "Deployed to Heroku!"
        heroku open
        ;;
    2)
        print_info "Deploying to Render..."
        print_info "Visit: https://dashboard.render.com"
        print_info "1. Click 'New +' -> 'Web Service'"
        print_info "2. Connect your GitHub repository"
        print_info "3. Select 'backend' as root directory"
        print_info "4. Configure environment variables"
        print_info "5. Click 'Create Web Service'"
        ;;
    3)
        print_info "Deploying to Railway..."
        print_info "Visit: https://railway.app"
        print_info "1. Click 'New Project'"
        print_info "2. Select 'Deploy from GitHub'"
        print_info "3. Connect your repository"
        print_info "4. Select 'backend' folder"
        print_info "5. Add environment variables"
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "🎉 Deployment process started!"
echo "🎵 Your Naadam app will be live soon!"
echo "======================================"
