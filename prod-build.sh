#!/bin/bash

# Exit immediately on error
set -e

# CONFIG: Paths
ANGULAR_DIR="./ClientApp"        # Path to Angular app
DIST_DIR="$ANGULAR_DIR/dist"     # Angular build output
TARGET_DIR="./wwwroot"  # ASP.NET Core wwwroot path

# Step 1: Build Angular app
echo "🔧 Building Angular app for production..."
cd "$ANGULAR_DIR"
ng build --configuration production

# Get the subdirectory name inside dist (usually the app name)
BUILD_SUBDIR=$(ls dist)
cd - > /dev/null

# Step 2: Clear wwwroot
echo "🧹 Cleaning wwwroot..."
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"

# Step 3: Move build output
echo "🚚 Moving build output to wwwroot..."
mv "$DIST_DIR/$BUILD_SUBDIR"/* "$TARGET_DIR"

# Optional: Remove empty folder structure
rm -rf "$DIST_DIR"

echo "✅ Build moved to wwwroot successfully."
