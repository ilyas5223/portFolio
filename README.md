# Ali Ilyas — Portfolio

Source for [aliilyas.vercel.app](https://aliilyas.vercel.app): the portfolio of Ali Ilyas, an engineer building AI voice agents, automation, and full stack products for small businesses and startups.

## What's on the site

- **Services:** AI voice agents (VAPI / Retell) with call dashboards, automation rescue for n8n and Make builds, cold outreach systems, and the custom backend work no-code tools can't reach.
- **Projects:** client and product work, including SkyfurnitureCA (production e-commerce for a US/Canada furniture client), ragbase (multi-tenant RAG chatbot SaaS), and DocSearch (AI document search).
- **Process, FAQ and contact.**

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · lucide-react / react-icons · deployed on Vercel

Light/dark theme, scroll-reveal animations, a custom cursor, and a `useReducedMotion` hook for `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the build
```

## Structure

```
src/components/   one component per section (Hero, Services, Projects, Process, FAQ, Contact, …)
src/context/      theme provider
src/hooks/        scroll reveal, reduced motion, counters
public/screenshots/  project screenshots used on the Projects cards
```

Project and service copy lives in `src/components/Projects.jsx` and `src/components/Services.jsx`.

## Contact

[aliilyas5223@gmail.com](mailto:aliilyas5223@gmail.com) · [GitHub](https://github.com/ilyas5223) · [LinkedIn](https://linkedin.com/in/ali-ilyas-b343463a8/)
