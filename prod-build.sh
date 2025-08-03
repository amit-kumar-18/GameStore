#!/bin/bash

# Exit immediately on error
set -e

# CONFIG: Paths
ANGULAR_DIR="./ClientApp"        # Path to Angular app
DIST_DIR="$ANGULAR_DIR/dist"     # Angular build output
TARGET_DIR="./wwwroot"           # ASP.NET Core wwwroot path
PUBLISH_DIR="./publish"          # Output folder for dotnet publish

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

# Step 3: Move Angular build to wwwroot
echo "🚚 Moving build output to wwwroot..."
mv "$DIST_DIR/$BUILD_SUBDIR"/* "$TARGET_DIR"

# Optional: Clean dist
rm -rf "$DIST_DIR"

# Step 4: Publish .NET Core app
echo "🚀 Publishing ASP.NET Core app..."
dotnet publish ./GameStore.Api.csproj -c Release -o "$PUBLISH_DIR"

echo "✅ Angular + .NET app published to $PUBLISH_DIR successfully."
