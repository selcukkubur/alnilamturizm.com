# Alnilam Turizm Website

A modern, responsive tourism website for Alnilam Turizm featuring bilingual support (Turkish/English), interactive contact forms, Google Maps integration, and beautiful galleries.

## 🌟 Features

### Language Support
- **Turkish as default language**
- **English translation** with complete language switching
- **Dynamic language switcher** in the header
- **Seamless content translation** for all text elements

### Website Sections
- **Hero Section** with image slider and call-to-action
- **Featured Destinations** with pricing and descriptions
- **About Us** section with company statistics
- **Complete Destinations Gallery** with lightbox functionality
- **Services Section** with detailed service offerings
- **Contact Page** with working form and Google Maps
- **Blog/News Section** with latest articles

### Interactive Features
- **Working Contact Form** with validation
- **Google Maps Integration** showing business location
- **Image Gallery** with lightbox effect
- **Responsive Design** for all devices
- **Smooth Animations** and transitions
- **Back to Top** button
- **Mobile Navigation** menu

### Technical Features
- **Modern CSS Grid** and Flexbox layouts
- **CSS Custom Properties** for consistent theming
- **JavaScript ES6 Classes** for modular code
- **Intersection Observer API** for scroll animations
- **Form Validation** with real-time feedback
- **Performance Optimized** with lazy loading
- **SEO Friendly** markup and meta tags

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Web server for development (optional)

### Installation

1. **Clone or download** the repository
2. **Add your images** to the appropriate directories:
   ```
   images/
   ├── logo.png (company logo)
   ├── cappadocia.jpg (hero slider)
   ├── pamukkale.jpg (hero slider)
   ├── istanbul.jpg (hero slider)
   ├── about-us.jpg (about section)
   ├── cappadocia-thumb.jpg (featured destinations)
   ├── pamukkale-thumb.jpg (featured destinations)
   ├── antalya-thumb.jpg (featured destinations)
   ├── gallery/
   │   ├── istanbul.jpg
   │   ├── cappadocia.jpg
   │   ├── bodrum.jpg
   │   └── olympos.jpg
   └── blog/
       ├── blog1.jpg
       ├── blog2.jpg
       └── blog3.jpg
   ```

3. **Open `index.html`** in your browser

### For Development with Live Server

If you want to use a development server:

```bash
# Using Node.js http-server
npm install -g http-server
http-server

# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000
```

## 📁 File Structure

```
alnilamturizm.com/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
├── images/             # Image assets
│   ├── gallery/        # Gallery images
│   └── blog/           # Blog images
└── .git/               # Git repository
```

## 🎨 Customization

### Colors and Branding
The website uses CSS custom properties for easy customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #1e3a8a;    /* Deep blue */
    --secondary-color: #06b6d4;  /* Cyan */
    --accent-color: #f59e0b;     /* Amber */
    /* ... other colors */
}
```

### Content Translation
To modify translations, update the `data-tr` and `data-en` attributes in `index.html`:

```html
<h1 data-tr="Türkçe Metin" data-en="English Text">Türkçe Metin</h1>
```

### Contact Information
Update contact details in the contact section and footer:
- Address: Atatürk Bulvarı No:123, Çankaya/Ankara
- Phone: +90 312 555 0123
- Email: info@alnilamturizm.com

### Google Maps
Replace the Google Maps embed URL in the iframe with your business location coordinates.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+

## 📈 Performance

- **Lazy loading** for images
- **CSS animations** with hardware acceleration
- **Optimized images** recommended (WebP format)
- **Minification** recommended for production

## 🌐 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your repository to Netlify
2. Set build command: (none needed)
3. Set publish directory: `/` (root)
4. Deploy

### Traditional Web Hosting
1. Upload all files to your web server
2. Point domain to the hosting directory
3. Ensure proper file permissions

## 📧 Contact Form Setup

The contact form is currently set up for frontend validation only. For a working backend:

### Option 1: Netlify Forms
Add `netlify` attribute to the form tag:
```html
<form class="contact-form" id="contactForm" netlify>
```

### Option 2: Custom Backend
Implement the `submitToServer()` method in `script.js` to send data to your backend API.

### Option 3: Third-party Services
Use services like Formspree, EmailJS, or similar form handling services.

## 🗺️ Google Maps API

For advanced Google Maps features:
1. Get a Google Maps API key
2. Replace the iframe with Google Maps JavaScript API
3. Customize markers, styles, and interactions

## 📝 Content Management

### Adding New Destinations
1. Add images to the `images/gallery/` directory
2. Add new cards to the destinations section in `index.html`
3. Include both Turkish and English content

### Adding Blog Posts
1. Add images to the `images/blog/` directory
2. Add new blog cards to the blog section
3. Link to full blog post pages

## 🔒 Security Considerations

- **Validate all form inputs** on the server side
- **Sanitize user data** before processing
- **Use HTTPS** for production
- **Implement rate limiting** for form submissions

## 🎯 SEO Optimization

- Update meta descriptions and titles
- Add Open Graph tags for social media
- Include structured data markup
- Optimize images with alt text
- Create XML sitemap

## 📞 Support

For questions or support regarding this website template:
- Review the code comments
- Check browser console for errors
- Ensure all image paths are correct
- Verify JavaScript is enabled

## 📄 License

This project is created for Alnilam Turizm. Modify as needed for your business requirements.

---

**Alnilam Turizm** - Discover Turkey's Most Beautiful Places 
