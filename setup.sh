#!/bin/bash

echo "🌟 Alnilam Turizm Website Setup"
echo "================================"

# Create image directories if they don't exist
echo "📁 Creating image directories..."
mkdir -p images/gallery images/blog

# Check if images already exist
if [ ! -f "images/cappadocia.jpg" ]; then
    echo "🖼️  Downloading placeholder images..."
    
    # Hero slider images
    curl -s "https://via.placeholder.com/1920x1080/1e3a8a/ffffff?text=Cappadocia+Hero" -o images/cappadocia.jpg
    curl -s "https://via.placeholder.com/1920x1080/06b6d4/ffffff?text=Pamukkale+Hero" -o images/pamukkale.jpg
    curl -s "https://via.placeholder.com/1920x1080/f59e0b/ffffff?text=Istanbul+Hero" -o images/istanbul.jpg
    
    # Featured destination thumbnails
    curl -s "https://via.placeholder.com/400x300/1e3a8a/ffffff?text=Cappadocia" -o images/cappadocia-thumb.jpg
    curl -s "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Pamukkale" -o images/pamukkale-thumb.jpg
    curl -s "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Antalya" -o images/antalya-thumb.jpg
    
    # About section image
    curl -s "https://via.placeholder.com/800x600/059669/ffffff?text=About+Us" -o images/about-us.jpg
    
    # Gallery images
    curl -s "https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Istanbul+Gallery" -o images/gallery/istanbul.jpg
    curl -s "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Cappadocia+Gallery" -o images/gallery/cappadocia.jpg
    curl -s "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Bodrum+Gallery" -o images/gallery/bodrum.jpg
    curl -s "https://via.placeholder.com/600x400/059669/ffffff?text=Olympos+Gallery" -o images/gallery/olympos.jpg
    
    # Blog images
    curl -s "https://via.placeholder.com/500x300/8b5cf6/ffffff?text=Blog+Post+1" -o images/blog/blog1.jpg
    curl -s "https://via.placeholder.com/500x300/ef4444/ffffff?text=Blog+Post+2" -o images/blog/blog2.jpg
    curl -s "https://via.placeholder.com/500x300/10b981/ffffff?text=Blog+Post+3" -o images/blog/blog3.jpg
    
    echo "✅ Placeholder images downloaded successfully!"
else
    echo "✅ Images already exist, skipping download."
fi

echo ""
echo "🚀 Starting local development server..."
echo "📱 Your website will be available at:"
echo "   http://localhost:8000"
echo ""
echo "💡 Tips:"
echo "   - Press Ctrl+C to stop the server"
echo "   - Replace placeholder images with real tourism photos"
echo "   - See IMAGE_SOURCES.md for free image resources"
echo "   - Check README.md for full documentation"
echo ""

# Try to start server with different methods
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3 server..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Using Python server..."
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "🐘 Using PHP server..."
    php -S localhost:8000
else
    echo "❌ No suitable server found."
    echo "Please install Python or PHP, or open index.html directly in your browser."
    echo "For the best experience, use a local server."
fi 
