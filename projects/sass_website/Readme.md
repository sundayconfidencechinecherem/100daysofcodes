# AirceFlow - Modern Workflow Solutions Platform

## Project Overview

A modern, responsive SaaS landing page for AirceFlow, a workflow management and team collaboration platform. The website showcases product features, pricing plans, customer testimonials, and provides a seamless user experience for potential customers. Built with a focus on conversion, performance, and modern design aesthetics.

This project is currently for demo purposes and showcases my skills as a full-stack software engineer.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup structure |
| SCSS | Modular, maintainable styling |
| JavaScript (Vanilla) | Interactive components (mobile menu, scroll animations, back to top) |
| CSS Grid/Flexbox | Responsive layouts |
| Font Awesome | Icon library |
| Google Fonts | Typography (Inter) |

## Project Structure

```
airceflow/
├── index.html              # Homepage
├── assets/
│   ├── images/            # All image assets
│   │   ├── sass.png       # Product dashboard preview
│   │   ├── demo.mp4       # Product demo video
│   │   ├── demo.avif      # Video poster image
│   │   ├── jessica.jpg    # Testimonial avatar
│   │   ├── micheal.jpg    # Testimonial avatar
│   │   ├── sophia.jpg     # Testimonial avatar
│   │   └── logo.png       # Brand logo
│   └── icons/             # Feature icons
├── css/
│   └── style.css          # Compiled CSS (from SCSS)
├── scss/
│   ├── main.scss          # Main entry point
│   ├── _variables.scss    # Color, font, spacing variables
│   ├── _reset.scss        # CSS reset
│   ├── _utilities.scss    # Helper classes
│   ├── _typography.scss   # Font styles
│   ├── _buttons.scss      # Button components
│   ├── _header.scss       # Navigation styles
│   ├── _hero.scss         # Hero section
│   ├── _features.scss     # Features grid
│   ├── _showcase.scss     # Product showcase with video
│   ├── _pricing.scss      # Pricing plans
│   ├── _testimonials.scss # Customer testimonials
│   ├── _footer.scss       # Footer with newsletter
│   └── _responsive.scss   # Responsive breakpoints
└── js/
    └── script.js          # Main JavaScript file
```

## Features

### Frontend Features
- ✅ Fully responsive design (mobile → tablet → desktop)
- ✅ Modern gradient hero section
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Feature cards with hover effects
- ✅ Product showcase with autoplay video demo
- ✅ Pricing comparison cards with featured plan
- ✅ Customer testimonial grid
- ✅ Newsletter subscription form
- ✅ Back to top button
- ✅ Social media integration
- ✅ Scroll-triggered fade-in animations

### Interactive Components
- ✅ **Sticky Header**: Changes style on scroll
- ✅ **Mobile Menu**: Hamburger toggle with slide-in animation
- ✅ **Active Navigation**: Highlights current section
- ✅ **Back to Top Button**: Appears after scrolling
- ✅ **Scroll Animations**: Fade-in effects using Intersection Observer
- ✅ **Auto-playing Video**: Muted demo video in showcase section
- ✅ **Current Year**: Auto-updates in footer copyright

### SEO & Accessibility
- ✅ Semantic HTML5 structure
- ✅ Skip navigation link for keyboard users
- ✅ ARIA labels for interactive elements
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text on all images
- ✅ Descriptive meta tags (Open Graph, Twitter Card)
- ✅ JSON-LD structured data (SoftwareApplication schema)
- ✅ Canonical URL
- ✅ Theme color for mobile browsers

## Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `$primary` | `#2D3E7B` | Primary blue - main brand |
| `$primary-light` | `#4A6FA5` | Light blue - gradients |
| `$secondary` | `#3B4E8C` | Secondary blue - buttons |
| `$accent` | `#f59e0b` | Gold - popular badge |
| `$text-dark` | `#1f2937` | Primary text |
| `$text-gray` | `#6b7280` | Secondary text |
| `$bg-light` | `#f9fafb` | Light backgrounds |
| `$bg-white` | `#ffffff` | White background |
| `$footer-bg` | `#1f2937` | Footer background |
| `$success` | `#10b981` | Green - checkmarks |

## Typography

| Font | Usage |
|------|-------|
| **Inter** | Headings and body text |
| **System UI** | Fallback font |

## Key Sections

### 1. Hero Section
- Gradient background
- Headline with gradient text effect
- Product dashboard image preview
- Two call-to-action buttons (Get Started, Learn More)

### 2. Features Section
- Three feature cards: Lightning Fast, Bank-Grade Security, 300+ Integrations
- Hover effects with lift and shadow
- Custom icon images

### 3. Showcase Section
- Product demonstration
- Auto-playing muted video loop
- Feature checklist
- "Explore Live Demo" button

### 4. Pricing Section
- Three pricing tiers: Basic ($19/mo), Pro ($49/mo), Enterprise (Custom)
- Pro plan featured with "Most Popular" badge
- Feature lists with checkmark icons
- Plan comparison

### 5. Testimonials Section
- Three customer testimonials
- 5-star rating display
- Customer avatars and details
- Quote icons

### 6. Footer
- Brand description
- Product and Company links
- Contact information with icons
- Newsletter subscription form
- Social media links
- Copyright and developer credit

## Setup Instructions

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sundayconfidencechinecherem/100daysofcodes.git
cd sass_website
```

2. **Install SCSS compiler**
```bash
npm install -g sass
```

3. **Compile SCSS to CSS**
```bash
# Development (watch mode)
sass scss/main.scss css/style.css --watch
```

### Local Development Server

```bash
# Using VS Code Live Server
# Install Live Server extension, right-click index.html → Open with Live Server
```

## File Descriptions

### SCSS Partials

| File | Description |
|------|-------------|
| `_variables.scss` | All design tokens (colors, fonts, spacing, breakpoints) |
| `_reset.scss` | Normalizes browser defaults |
| `_utilities.scss` | Helper classes (container, skip-link) |
| `_typography.scss` | Headings, text styles, section headers |
| `_buttons.scss` | Button variants (primary, secondary, outline, sizes) |
| `_header.scss` | Navigation bar + mobile hamburger menu |
| `_hero.scss` | Hero section with gradient text |
| `_features.scss` | 3-column feature grid with cards |
| `_showcase.scss` | Product showcase with video demo |
| `_pricing.scss` | Pricing plans with featured card |
| `_testimonials.scss` | Testimonials grid with avatars |
| `_footer.scss` | Footer with newsletter and social links |
| `_responsive.scss` | Responsive breakpoints for all sections |

### JavaScript Modules

| Function | Description |
|----------|-------------|
| `initMobileMenu()` | Hamburger menu toggle |
| `initStickyHeader()` | Header shadow on scroll |
| `initActiveNav()` | Highlights current section in nav |
| `initBackToTop()` | Shows/hides back to top button |
| `initScrollAnimations()` | Fade-in animations on scroll |
| `initCurrentYear()` | Updates copyright year |
| `initSmoothScroll()` | Smooth scrolling for anchor links |

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome/Safari | Latest |

## Performance Optimizations

- ✅ Lazy loading for images
- ✅ Preload video poster
- ✅ Minified CSS in production
- ✅ Efficient CSS selectors
- ✅ Debounced scroll events
- ✅ Passive event listeners

## Future Enhancements

- [ ] Full app with integrations for easy conversation response and followup, helping smbs and online vendors. 
- [ ] User authentication system
- [ ] Live chat support
- [ ] Interactive pricing calculator
- [ ] Product tour/walkthrough
- [ ] Blog section
- [ ] API documentation page
- [ ] Status page
- [ ] Affiliate program landing page
- [ ] Email marketing integration
- [ ] Analytics dashboard

## Credits

**Developer:** Confidence Chinecherem

**Design Inspiration:** Modern SaaS landing pages with clean aesthetics by confidence chinecherem

**Icons:** Font Awesome, Custom PNG icons

**Fonts:** Google Fonts (Inter)

**Video Demo:** Custom product demonstration from google

## License

© 2026 AirceFlow. All rights reserved.

## Contact

For questions or support:
- **Email:** dev.confidencechinecherem.com
- **GitHub:** [github.com/confidencechinecherem](https://github.com/sundayconfidencechinecherem)
- **Portfolio:** [confidencechinecherem.com](https://confidencechinecherem.com)

---

*Streamline workflows, empower teams, and scale effortlessly. By Engr. Confidence Chinecherem*