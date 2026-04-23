# Chef Bio Michael - Culinary Portfolio Website

## Project Overview

A modern, responsive portfolio website for Chef Bio Michael, an Intercontinental Sous Chef. The website showcases culinary expertise, services offered, signature creations, and provides a seamless booking system for clients. Built with a focus on elegant design, performance, and user experience.  This  project is currently for demo, and to showcase my skills as a software engineer.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup structure |
| SCSS | Modular, maintainable styling |
| JavaScript (Vanilla) | Interactive components & form handling |
| Iconify | SVG icon library |
| Google Fonts | Typography (Inter + Cormorant Garamond) |

## Project Structure

```
chef-portfolio-website/
├── index.html              # Homepage
├── booking.html            # Booking page
├── assets/
│   ├── images/            # All image assets
│   │   
│   │   
│   └── favicon/           # Favicon files
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
│   ├── _services.scss     # Services section
│   ├── _gallery.scss      # Gallery section
│   ├── _philosophy.scss   # About section
│   ├── _testimonials.scss # Testimonials
│   ├── _press.scss        # Press bar
│   ├── _contact.scss      # Contact section
│   ├── _booking.scss      # Booking page styles
│   ├── _footer.scss       # Footer
│   └── _floating-book.scss # Floating action button
└── js/
    └── script.js          # Main JavaScript file
```

## Features

### Frontend Features
- ✅ Fully responsive design (mobile → tablet → desktop)
- ✅ Dark/Luxury color scheme with gold accents
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Interactive service cards with hover effects
- ✅ Image gallery with hover captions
- ✅ Parallax hero background effect
- ✅ Scroll-triggered animations (Intersection Observer)
- ✅ Active navigation highlighting
- ✅ FAQ accordion on booking page

### Booking System
- ✅ Comprehensive booking form with validation
- ✅ Real-time error checking
- ✅ Date picker with minimum date restriction
- ✅ Phone number auto-formatting
- ✅ Guest count validation
- ✅ Honeypot anti-spam protection
- ✅ Success/error toast messages
- ✅ Loading states on submit

### SEO & Accessibility
- ✅ Semantic HTML5 structure
- ✅ Meta tags (description, keywords, Open Graph, Twitter Card)
- ✅ JSON-LD structured data (Person, LocalBusiness, BreadcrumbList)
- ✅ Canonical URLs
- ✅ ARIA labels and roles
- ✅ Skip navigation link
- ✅ Proper heading hierarchy (H1 → H2 → H3)

## Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `$color-bg` | `#0a0a0a` | Main background |
| `$color-bg-off` | `#111111` | Alternate background |
| `$color-surface` | `#1a1a1a` | Card backgrounds |
| `$color-text` | `#e8e8e8` | Primary text |
| `$color-text-muted` | `#a0a0a0` | Secondary text |
| `$color-accent` | `#d4a574` | Gold accents, buttons |
| `$color-accent-dark` | `#b8865a` | Hover states |
| `$color-border` | `#2a2a2a` | Borders |

## Typography

| Font | Usage |
|------|-------|
| **Cormorant Garamond** | Headings, serif accents |
| **Inter** | Body text, navigation, buttons |




### Local Development Server


# Using VS Code Live Server
# Install Live Server extension, right-click index.html → Open with Live Server
```

## File Descriptions

### SCSS Partials

| File | Description |
|------|-------------|
| `_variables.scss` | All design tokens (colors, fonts, spacing, breakpoints) |
| `_reset.scss` | Normalizes browser defaults |
| `_utilities.scss` | Helper classes (flex, grid, spacing, display) |
| `_typography.scss` | Headings, text styles, dividers |
| `_buttons.scss` | Button variants (primary, outline, full-width) |
| `_header.scss` | Navigation bar + mobile menu |
| `_hero.scss` | Hero section with stats and CTA |
| `_services.scss` | Service cards with background images |
| `_gallery.scss` | Responsive image gallery |
| `_philosophy.scss` | About/Chef philosophy section |
| `_testimonials.scss` | Client testimonials |
| `_press.scss` | Press logos bar |
| `_contact.scss` | Contact form and information |
| `_booking.scss` | Booking page specific styles |
| `_footer.scss` | Footer with links and copyright |
| `_floating-book.scss` | Floating CTA button |

### JavaScript Modules

| Function | Description |
|----------|-------------|
| `openMobileMenu()` | Opens mobile navigation |
| `closeMobileMenu()` | Closes mobile navigation |
| `updateActiveNav()` | Highlights current section in nav |
| `validateField()` | Validates individual form fields |
| `showStatus()` | Displays toast messages |
| FAQ Accordion | Expand/collapse functionality |
| Intersection Observer | Scroll-triggered animations |
| Parallax Effect | Hero background movement |

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome/Safari | Latest |

```


## Credits

**Developer:** Confidence Chinecherem 

**Design Inspiration:** Modern luxury culinary portfolios by Confidence Chinecherem 

**Icon Library:** Lucide icons via Iconify

**Fonts:** Google Fonts (Inter + Cormorant Garamond)

## License

© 2026 Chef Bio Michael. All rights reserved.

## Contact

For questions or support:
- **Email:** dev.confidencechinecherem.com
- **GitHub:** [github.com/sundayconfidencechinecherem](https://github.com/sundayconfidencechinecherem)
- **Portfolio:** [confidencechinecherem.com](https://confidencechinecherem.com)

---

*Built with intention. Designed for excellence. By Engr. Confidence Chinecherem*