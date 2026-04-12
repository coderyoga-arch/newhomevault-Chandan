# NewHomeVault — React Clone

Built by **Argosmob Tech and AI Pvt. Ltd.**

## Tech Stack
- **React 18** + **Vite**
- No external router (state-based navigation)
- Google Fonts: Cormorant Garamond + Jost
- Unsplash images (replace with client images)

## Pages
| Page | File |
|------|------|
| Home | `src/pages/Home.jsx` |
| About Us | `src/pages/About.jsx` |
| Property Listing | `src/pages/Property.jsx` |
| Property Detail | `src/pages/PropertyDetail.jsx` |
| Services | `src/pages/Services.jsx` |
| Contact | `src/pages/Contact.jsx` |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

## Customization

### Update Property Data
Edit `src/data/data.js` — contains all properties, testimonials, and blog posts.

### Update Colors / Fonts
Edit CSS variables in `src/index.css`:
```css
:root {
  --navy: #0d1b2a;
  --gold: #b8952a;
  --gold-light: #d4af5a;
  --cream: #f9f5ee;
}
```

### Replace Images
Swap Unsplash URLs in `src/data/data.js` and individual page files with your Cloudinary URLs.

### Add Real Contact Form
Connect the forms in `Contact.jsx` and `PropertyDetail.jsx` to your ExpressJS backend or email service.

## Notes
- Images are sourced from Unsplash for demo purposes
- Disclaimer text matches the original site's pre-construction disclosure
- No `react-router-dom` needed — navigation is handled via a `navigate()` state function passed through props
