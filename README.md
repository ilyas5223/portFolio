# Portfolio v2 — Awwwards-Grade React Portfolio

A stunning, production-grade portfolio built with **React 18 + Tailwind CSS 3 + Vite 5**.

## ✦ What's Inside

### Signature Features
| Feature | Description |
|---------|-------------|
| 🎬 Cinematic Preloader | Animated counter with monogram, progress bar, and smooth exit |
| 🖱️ Custom Magnetic Cursor | Morphing cursor ring with label reveal on hover |
| 📊 Scroll Progress Bar | Thin accent line tracking reading position |
| 🌙 Dark / Light Mode | System-aware with smooth CSS variable transitions |
| 🌊 Scroll Reveal | Intersection Observer with stagger delays (fade, slide, scale, clip-path) |
| 🖼️ 3D Tilt Cards | requestAnimationFrame-powered perspective transforms |
| 🎯 Parallax Hero | Mouse-tracking parallax on the avatar card |
| ⌨️ Typewriter | Multi-role cycling typewriter in the hero |
| 📡 Radar Chart | SVG skill visualization with category tabs |
| 🎠 Infinite Marquee | Tech stack scrolling strip |
| 🔢 Counter Animation | Eased count-up for stats and metrics |
| ⏱️ Animated Timeline | SVG line draw on scroll in Experience |
| 🪗 Smooth Accordion | Height-animated FAQ with progress indicator |

### Sections
1. **Hero** — Kinetic typography, parallax card, animated stats, typewriter role cycling
2. **About** — Split layout, 3D tilt value cards, marquee strip
3. **Skills** — Tabbed categories, SVG radar chart, animated progress bars
4. **Projects** — 3D tilt cards, impact metrics, filter system
5. **Experience** — Animated timeline with SVG connector
6. **Blog** — Magazine layout, color-coded categories, newsletter
7. **FAQs** — Smooth accordion with progress indicator
8. **Contact** — Form with hover effects, social links, availability badge

---

## 🚀 Quick Start

```bash
# 1. Unzip the project
unzip portfolio-v2.zip
cd portfolio2

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
npm run preview
```

---

## 🎨 Personalization Guide

### Step 1 — Personal Info (5 minutes)

**`index.html`**
- Update `<title>` and `<meta description>`

**`src/components/Hero.jsx`**
- Change `roles` array (line 5) — your actual roles
- Update name "Alex Morgan" to yours
- Update bio paragraph
- Update stats (years, projects, clients)

**`src/components/About.jsx`**
- Update bio paragraphs
- Change quick facts (location, education, employer)
- Update achievement numbers

**`src/components/Navbar.jsx`**
- Change the monogram letter "A" to yours

### Step 2 — Content (15 minutes)

**`src/components/Projects.jsx`** — Replace all 4 projects with your real work
**`src/components/Experience.jsx`** — Update roles, companies, bullets, education
**`src/components/Skills.jsx`** — Adjust skill names and percentages
**`src/components/Blog.jsx`** — Add your real articles
**`src/components/FAQ.jsx`** — Customize questions and answers
**`src/components/Contact.jsx`** — Update social links and email
**`src/components/Footer.jsx`** — Update social links, email, current project

### Step 3 — Colors (2 minutes)

Edit `tailwind.config.js` and `src/index.css` CSS variables:

```css
:root {
  --bg:     #F8F3EA;  /* Background — change to your brand */
  --accent: #C17B4A;  /* Primary accent — swap for any color */
  --ink:    #0D0D0F;  /* Text color */
}
```

### Step 4 — Fonts (2 minutes)

Edit `index.html` Google Fonts URL and `tailwind.config.js` fontFamily:

```js
fontFamily: {
  display: ['"Fraunces"', 'serif'],   // Hero headings
  heading: ['"Playfair Display"', 'serif'], // Section headings
  body: ['"Outfit"', 'sans-serif'],   // Body text
  mono: ['"JetBrains Mono"', 'monospace'], // Labels, tags
}
```

---

## 🛠 Contact Form — Connect a Backend

The form currently simulates submission. To go live:

### Option A: Formspree (easiest)
```jsx
// In Contact.jsx handleSubmit:
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

### Option B: EmailJS
```bash
npm install @emailjs/browser
```
```jsx
import emailjs from '@emailjs/browser'
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
```

---

## 📁 File Structure

```
portfolio2/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackToTop.jsx
│   │   ├── Blog.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Experience.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── Skills.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useCounter.js
│   │   └── useScrollReveal.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🌐 Deployment

### Vercel (Recommended — free)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag dist/ to Netlify dashboard
# Or: netlify deploy --dir=dist --prod
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

---

## 📜 License
MIT — Free to use, modify, and deploy. Attribution appreciated but not required.
