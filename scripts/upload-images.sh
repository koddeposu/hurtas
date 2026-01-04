#!/bin/bash

# Upload Images to Cloudflare R2 Script
# 
# Usage: ./scripts/upload-images.sh
#
# This script uploads all images from public/product/ to your R2 bucket
# Make sure to configure your R2 credentials in .env first

set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check required env vars
if [ -z "$R2_ACCOUNT_ID" ] || [ -z "$R2_ACCESS_KEY_ID" ] || [ -z "$R2_SECRET_ACCESS_KEY" ] || [ -z "$R2_BUCKET_NAME" ]; then
  echo "❌ Error: Missing R2 environment variables"
  echo "Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME in .env"
  exit 1
fi

ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
SOURCE_DIR="public/product"
TARGET_PREFIX="products"

echo "🚀 Uploading images to Cloudflare R2..."
echo "   Bucket: $R2_BUCKET_NAME"
echo "   Source: $SOURCE_DIR"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI is not installed."
  echo "Install it with: brew install awscli"
  echo "Or: pip install awscli"
  exit 1
fi

# Configure AWS CLI for R2
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="auto"

# Count files
FILE_COUNT=$(find "$SOURCE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \) | wc -l | tr -d ' ')
echo "📁 Found $FILE_COUNT image files"
echo ""

# Upload each file
UPLOADED=0
for file in $(find "$SOURCE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \)); do
  filename=$(basename "$file")
  key="${TARGET_PREFIX}/${filename}"
  
  # Determine content type
  case "${file##*.}" in
    jpg|jpeg) content_type="image/jpeg" ;;
    png) content_type="image/png" ;;
    webp) content_type="image/webp" ;;
    gif) content_type="image/gif" ;;
    *) content_type="application/octet-stream" ;;
  esac
  
  echo "⬆️  Uploading: $filename"
  
  aws s3 cp "$file" "s3://${R2_BUCKET_NAME}/${key}" \
    --endpoint-url "$ENDPOINT" \
    --content-type "$content_type" \
    --only-show-errors
  
  ((UPLOADED++))
done

echo ""
echo "✅ Successfully uploaded $UPLOADED files to R2"
echo ""
echo "Your images are available at:"
echo "${R2_PUBLIC_URL}/${TARGET_PREFIX}/<filename>"
