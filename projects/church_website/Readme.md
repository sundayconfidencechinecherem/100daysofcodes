# Grace Abound Ministry - Church Website

## Project Overview

A modern, responsive church website for Grace Abound Ministry (Word Healing Bible Church). The website serves as a digital sanctuary where visitors can learn about the ministry, access sermons, submit prayer requests, share testimonies, find fellowship locations, and connect with the church community. Built with a focus on spiritual engagement, accessibility, and user experience.

This project is currently for demo purposes and showcases my skills as a full-stack software engineer.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup structure |
| SCSS | Modular, maintainable styling |
| JavaScript (Vanilla) | Interactive components (carousel, tabs, dropdowns, forms) |
| CSS Grid/Flexbox | Responsive layouts |
| Google Maps API | Location integration |

-**live link** [Grace Abound Ministry](https://graceaboundministry.netlify.app/)

## Project Structure

```
grace-abound-ministry/
├── index.html              # Homepage
├── about.html              # About the ministry
├── sermons.html            # Sermons archive
├── events.html             # Events calendar
├── news.html               # News & announcements
├── contact.html            # Contact page
├── donations.html          # Giving page
├── testimonials.html       # Testimonies archive
├── assets/
│   ├── images/            # All image assets
│   ├── icons/             # Social media icons
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
│   ├── _hero-carousel.scss # Hero carousel section
│   ├── _about.scss        # About section
│   ├── _quick-access.scss  # Quick access cards with dropdowns
│   ├── _fellowship.scss    # Church location & fellowship tabs
│   ├── _testimonies.scss   # Testimonies section
│   ├── _footer.scss       # Footer
│   └── _responsive.scss   # Responsive breakpoints
└── js/
    └── script.js          # Main JavaScript file
```

## Features

### Frontend Features
- ✅ Fully responsive design (mobile → tablet → desktop)
- ✅ Full-width hero carousel with 3 slides (auto-rotate + manual controls)
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Interactive quick access cards with dropdown forms
- ✅ Tabbed interface for fellowship locations
- ✅ Testimonies grid with author avatars
- ✅ Google Maps integration for church locations
- ✅ Newsletter subscription form
- ✅ Social media integration

### Interactive Components
- ✅ **Hero Carousel**: Auto-playing slides with dot navigation
- ✅ **Quick Access Cards**: Four cards with expandable dropdowns:
  - I am New (visitor information)
  - Prayer Requests (submission form)
  - Share Testimony (category-based form)
  - Resources (quick links)
- ✅ **Fellowship Tabs**: Four tab panels showing:
  - Find a Location (with map + venue list)
  - Join Satellite Fellowship (small groups)
  - Online Service (platform links)
  - Start a Fellowship (application form)
- ✅ **Form Validation**: Prayer, testimony, and fellowship forms
- ✅ **Animated Stats**: Number counters in about section

### SEO & Accessibility
- ✅ Semantic HTML5 structure
- ✅ Skip navigation link for keyboard users
- ✅ ARIA labels and roles (tablist, tabpanel, etc.)
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text on all images
- ✅ Descriptive meta tags

## Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `$primary-color` | `#b91c1c` | Primary red - main brand |
| `$primary-hover` | `#991b1b` | Button hover state |
| `$primary-light` | `#ef4444` | Light red accents |
| `$secondary-color` | `#0f172a` | Dark blue - secondary brand |
| `$accent-color` | `#f59e0b` | Gold - highlights & CTA |
| `$accent-hover` | `#d97706` | Accent hover state |
| `$gray-50` | `#f8fafc` | Light backgrounds |
| `$gray-900` | `#0f172a` | Dark text |
| `$text-primary` | `#0f172a` | Primary text |
| `$text-secondary` | `#64748b` | Secondary text |
| `$bg-main` | `#ffffff` | Main background |
| `$bg-section` | `#f8fafc` | Alternate section background |

## Typography

| Font | Usage |
|------|-------|
| **System UI / Segoe UI** | Headings and body text |
| **Inter** | Navigation, buttons (via Google Fonts) |

## Key Sections

### 1. Hero Carousel
- 3 slides featuring: Welcome message, Worship invitation, Prayer line
- Auto-rotating with dot navigation
- Call-to-action buttons on each slide

### 2. About Section
- Left: Ministry description with stats (15+ years, 5000+ souls reached, 100+ testimonies)
- Right: Church image with establishment badge
- Animated number counters

### 3. Quick Access Cards
- Four interactive cards that expand to reveal dropdown content
- **Card 1 (I am New)**: Visitor expectations and service times
- **Card 2 (Prayer Requests)**: Form to submit prayer requests
- **Card 3 (Share Testimony)**: Category-based testimony form
- **Card 4 (Resources)**: Quick links to sermons, devotionals, etc.

### 4. Fellowship Section
- Tabbed interface for location information
- **Tab 1**: Church locations with addresses and embedded Google Map
- **Tab 2**: Small group fellowship listings
- **Tab 3**: Online service platform links
- **Tab 4**: Application to start a new fellowship

### 5. Testimonies Section
- Three featured testimonies with author details
- Categories: Healing, Marriage Restoration, Financial Breakthrough
- Link to full testimonies archive

### 6. Footer
- Ministry description
- Quick links navigation
- Resources links
- Social media icons
- Newsletter subscription form
- Copyright and developer credit

## Setup Instructions


### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sundayconfidencechinecherem/100daysofcodes.git
cd church website
```

2. **Install SCSS compiler**
```bash
npm install -g sass
```

3. **Compile SCSS to CSS**
```bash
# Development (watch mode)
sass scss/main.scss css/style.css --watch



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
| `_utilities.scss` | Helper classes (flex, grid, spacing) |
| `_typography.scss` | Headings, text styles, section headers |
| `_buttons.scss` | Button variants (primary, outline, sizes) |
| `_header.scss` | Navigation bar + mobile hamburger menu |
| `_hero-carousel.scss` | Full-width carousel with slides and dots |
| `_about.scss` | About section with stats and image |
| `_quick-access.scss` | 4-card grid with dropdown expandable content |
| `_fellowship.scss` | Tabbed interface for church locations |
| `_testimonies.scss` | Testimonies grid with author cards |
| `_footer.scss` | Footer with newsletter and social links |
| `_responsive.scss` | Responsive breakpoints for all sections |

### JavaScript Modules

| Function | Description |
|----------|-------------|
| `initCarousel()` | Auto-rotating hero carousel with dot controls |
| `initQuickCards()` | Dropdown expansion for quick access cards |
| `initFellowshipTabs()` | Tab switching for fellowship section |
| `initMobileMenu()` | Hamburger menu toggle |
| `initStatsCounter()` | Animated number counters in about section |
| `initFormValidation()` | Prayer, testimony, and fellowship form validation |
| `initSmoothScroll()` | Smooth scrolling for anchor links |

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome/Safari | Latest |



## Credits

**Developer:** Confidence Chinecherem

**Design Inspiration:** Modern church websites with spiritual elegance

**Icons:** Custom PNG icons from icons8.com

**Fonts:** System UI / Google Fonts (Inter)

**Maps:** Google Maps Embed API

## License

© 2026 Grace Abound Ministry. All rights reserved.

## Contact

For questions or support:
- **Email:** dev.confidencechinecherem.com
- **GitHub:** [github.com/confidencechinecherem](https://github.com/confidencechinecherem)
- **Portfolio:** [confidencechinecherem.com](https://confidencechinecherem.com)

---

*Built with intention. Designed for worship. By Engr. Confidence Chinecherem*
