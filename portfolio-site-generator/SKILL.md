---
name: portfolio-site-generator
description: Generates a complete personal portfolio / business card website as a single index.html file. Use when the user wants to create a personal site, portfolio, business card site, or landing page about themselves. Asks the user questions about who they are, their role, bio, tech stack, and contacts, then generates a polished, responsive, dark-themed HTML file with no external dependencies.
---

# Portfolio Site Generator

Generates a complete `index.html` personal portfolio site. No external dependencies — everything is inline (CSS, JS, SVG icons).

## Step 1 — Gather user info

Use the `AskQuestion` tool to collect the following. If unavailable, ask conversationally.

**Questions to ask:**

1. **Name** — Full name or how they want to be called on the site
2. **Role / Title** — e.g. "CTO", "Frontend Developer", "Product Designer", "Founder"
3. **Tagline** — One sentence personal philosophy or approach (e.g. "I build teams as carefully as I build systems")
4. **About paragraph 1** — How they got into their field; their story/origin
5. **About paragraph 2** — Philosophy, values, how they work
6. **About paragraph 3** — Life outside work: hobbies, interests, personal details
7. **Tech stack / skills** — Comma-separated list of tools, languages, or skills to show as tags
8. **Contacts** — Which of these to include and the actual values:
   - Email
   - Telegram handle
   - GitHub handle
   - LinkedIn handle/URL
9. **Color scheme** — Choose one:
   - `cyan` — Deep navy + electric cyan (default, tech/CTO feel)
   - `purple` — Dark + violet (creative, designer feel)
   - `emerald` — Dark + green (developer, open-source feel)
   - `amber` — Dark + gold (founder, business feel)

## Step 2 — Generate the file

Use the collected answers to fill in the template below. Write the result to `index.html` in the workspace root.

### Color scheme variables

Replace `:root` variables based on chosen scheme:

**cyan** (default):
```css
--accent-300: #67e8f9; --accent-400: #22d3ee; --accent-500: #06b6d4; --accent-600: #0891b2;
--bg-primary: #07111a; --text-primary: #e8f4f8; --text-secondary: #7fb3c8;
--border: rgba(6, 182, 212, 0.15);
```
Gradient: `rgba(6, 182, 212, 0.12)`, `rgba(8, 145, 178, 0.07)`, `rgba(14, 165, 233, 0.05)`

**purple**:
```css
--accent-300: #c4b5fd; --accent-400: #a78bfa; --accent-500: #8b5cf6; --accent-600: #7c3aed;
--bg-primary: #0f0b1a; --text-primary: #f0ecf9; --text-secondary: #a09bb5;
--border: rgba(139, 92, 246, 0.15);
```
Gradient: `rgba(124, 58, 237, 0.15)`, `rgba(139, 92, 246, 0.08)`, `rgba(109, 40, 217, 0.06)`

**emerald**:
```css
--accent-300: #6ee7b7; --accent-400: #34d399; --accent-500: #10b981; --accent-600: #059669;
--bg-primary: #060f0a; --text-primary: #ecfdf5; --text-secondary: #6ee7b7;
--border: rgba(16, 185, 129, 0.15);
```
Gradient: `rgba(16, 185, 129, 0.12)`, `rgba(5, 150, 105, 0.07)`, `rgba(6, 95, 70, 0.05)`

**amber**:
```css
--accent-300: #fcd34d; --accent-400: #fbbf24; --accent-500: #f59e0b; --accent-600: #d97706;
--bg-primary: #0f0d07; --text-primary: #fefce8; --text-secondary: #a8935a;
--border: rgba(245, 158, 11, 0.15);
```
Gradient: `rgba(245, 158, 11, 0.10)`, `rgba(217, 119, 6, 0.06)`, `rgba(180, 83, 9, 0.04)`

### HTML template

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{NAME}} — {{ROLE}}</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      /* INSERT COLOR VARIABLES HERE */
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.75;
      min-height: 100vh;
      overflow-x: hidden;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 50% 0%, {{GRAD1}} 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 85% 100%, {{GRAD2}} 0%, transparent 50%),
        radial-gradient(ellipse 50% 40% at 5% 55%, {{GRAD3}} 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 1.2rem 2rem; display: flex; justify-content: center; gap: 2rem;
      backdrop-filter: blur(20px);
      background: color-mix(in srgb, var(--bg-primary) 75%, transparent);
      border-bottom: 1px solid var(--border);
    }

    nav a {
      color: var(--text-secondary); text-decoration: none;
      font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;
      transition: color 0.25s; position: relative; padding: 0.2rem 0;
    }

    nav a::after {
      content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
      height: 2px; background: var(--accent-400); border-radius: 1px;
      transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
    }

    nav a:hover { color: var(--accent-300); }
    nav a:hover::after, nav a.active::after { transform: scaleX(1); }
    nav a.active { color: var(--accent-400); }

    section {
      position: relative; z-index: 1;
      max-width: 760px; margin: 0 auto;
      padding: 0 1.5rem; scroll-margin-top: 96px;
    }

    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; align-items: flex-start; gap: 1.2rem;
    }

    @keyframes heroSlideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .hero > * { animation: heroSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
    .hero > *:nth-child(1) { animation-delay: 0.10s; }
    .hero > *:nth-child(2) { animation-delay: 0.22s; }
    .hero > *:nth-child(3) { animation-delay: 0.34s; }
    .hero > *:nth-child(4) { animation-delay: 0.46s; }
    .hero > *:nth-child(5) { animation-delay: 0.58s; }

    .hero-greeting { font-size: 1rem; color: var(--accent-400); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

    .hero h1 {
      font-size: clamp(2.8rem, 7vw, 4.5rem); font-weight: 700;
      line-height: 1.1; letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-400) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .hero-role { font-size: clamp(1.1rem, 2.5vw, 1.35rem); color: var(--text-primary); font-weight: 500; opacity: 0.8; }

    .hero-tagline { font-size: clamp(1rem, 2.2vw, 1.15rem); color: var(--text-secondary); max-width: 540px; line-height: 1.8; }

    .hero-cta {
      margin-top: 1rem; display: inline-block; padding: 0.75rem 2rem;
      border: 1px solid var(--accent-500); border-radius: 999px;
      color: var(--accent-400); text-decoration: none; font-size: 0.95rem;
      transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s;
    }

    .hero-cta:hover {
      background: var(--accent-600); color: #fff;
      box-shadow: 0 0 28px color-mix(in srgb, var(--accent-500) 40%, transparent);
      transform: translateY(-2px);
    }

    .about { padding-top: 8rem; padding-bottom: 6rem; }

    .section-label { font-size: 0.85rem; color: var(--accent-400); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 500; }

    .section-title { font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 700; letter-spacing: -0.01em; margin-bottom: 2rem; }

    .about p { color: var(--text-secondary); margin-bottom: 1.4rem; font-size: 1.05rem; line-height: 1.85; }

    .tech-label { font-size: 0.9rem; color: var(--text-primary); font-weight: 500; margin-top: 2.5rem; margin-bottom: 1rem; opacity: 0.65; }

    .tech-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }

    .tech-tag {
      padding: 0.4rem 1rem; border-radius: 999px;
      background: var(--bg-card, rgba(255,255,255,0.04)); border: 1px solid var(--border);
      font-size: 0.85rem; color: var(--accent-400); white-space: nowrap;
      transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s, color 0.25s;
      cursor: default;
    }

    .tech-tag:hover {
      transform: translateY(-2px); border-color: var(--accent-500);
      color: var(--accent-300);
      box-shadow: 0 0 18px color-mix(in srgb, var(--accent-500) 30%, transparent);
    }

    .contacts { padding-top: 4rem; padding-bottom: 8rem; }

    .contact-card {
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 1.2rem; padding: 2.5rem; margin-top: 2rem;
    }

    .contact-card p { color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.8; }

    .contact-links { display: flex; flex-direction: column; gap: 0.2rem; }

    .contact-link {
      display: flex; align-items: center; gap: 0.8rem;
      color: var(--text-primary); text-decoration: none; font-size: 1rem;
      padding: 0.65rem 0.8rem; border-radius: 0.6rem; position: relative;
      transition: color 0.25s, transform 0.2s;
    }

    .contact-link::before {
      content: ''; position: absolute; inset: 0; border-radius: 0.6rem;
      background: var(--accent-500); opacity: 0; transition: opacity 0.25s;
    }

    .contact-link:hover { color: var(--accent-300); transform: translateX(6px); }
    .contact-link:hover::before { opacity: 0.06; }

    .contact-link svg, .contact-link span { position: relative; z-index: 1; }

    .contact-link svg { width: 22px; height: 22px; flex-shrink: 0; color: var(--accent-500); transition: color 0.25s; }
    .contact-link:hover svg { color: var(--accent-400); }

    .divider { height: 1px; background: var(--border); margin: 0 auto; max-width: 760px; }

    footer { position: relative; z-index: 1; text-align: center; padding: 2rem 1rem 3rem; color: var(--text-secondary); font-size: 0.8rem; opacity: 0.5; }

    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
    .fade-in.visible { opacity: 1; transform: translateY(0); }

    @media (max-width: 600px) {
      nav { padding: 1rem; gap: 1.2rem; }
      nav a { font-size: 0.8rem; }
      .contact-card { padding: 1.5rem; }
      section { padding: 0 1.2rem; }
    }
  </style>
</head>
<body>

  <nav>
    <a href="#hero">Главная</a>
    <a href="#about">О себе</a>
    <a href="#contacts">Контакты</a>
  </nav>

  <section class="hero" id="hero">
    <span class="hero-greeting">Привет, я</span>
    <h1>{{NAME}}</h1>
    <p class="hero-role">{{ROLE}}</p>
    <p class="hero-tagline">{{TAGLINE}}</p>
    <a href="#contacts" class="hero-cta">Написать мне</a>
  </section>

  <div class="divider"></div>

  <section class="about" id="about">
    <p class="section-label fade-in">Обо мне</p>
    <h2 class="section-title fade-in">{{ABOUT_TITLE}}</h2>
    <p class="fade-in">{{ABOUT_P1}}</p>
    <p class="fade-in">{{ABOUT_P2}}</p>
    <p class="fade-in">{{ABOUT_P3}}</p>
    <p class="tech-label fade-in">{{TECH_LABEL}}</p>
    <div class="tech-grid fade-in">
      {{TECH_TAGS}}
    </div>
  </section>

  <div class="divider"></div>

  <section class="contacts" id="contacts">
    <p class="section-label fade-in">Контакты</p>
    <h2 class="section-title fade-in">Давайте поговорим</h2>
    <div class="contact-card fade-in">
      <p>{{CONTACT_INTRO}}</p>
      <div class="contact-links">
        {{CONTACT_LINKS}}
      </div>
    </div>
  </section>

  <footer>&copy; {{YEAR}} {{NAME}}</footer>

  <script>
    let n = 0;
    const fo = new IntersectionObserver((entries) => {
      entries.filter(e => e.isIntersecting)
             .sort((a,b) => a.target.offsetTop - b.target.offsetTop)
             .forEach(e => { setTimeout(() => e.target.classList.add('visible'), n++ * 100); fo.unobserve(e.target); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-in').forEach(el => fo.observe(el));

    const links = document.querySelectorAll('nav a');
    const vis = new Map();
    const setActive = id => links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    const no = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? vis.set(e.target.id, { r: e.intersectionRatio, t: e.boundingClientRect.top }) : vis.delete(e.target.id));
      if (!vis.size) return;
      setActive([...vis.entries()].sort((a,b) => b[1].r - a[1].r || Math.abs(a[1].t) - Math.abs(b[1].t))[0][0]);
    }, { threshold: [0.2,0.35,0.5,0.65], rootMargin: '-90px 0px -45% 0px' });
    document.querySelectorAll('section[id]').forEach(s => no.observe(s));
    setActive('hero');
  </script>

</body>
</html>
```

### Contact link snippets (use only the ones provided by the user)

**Email:**
```html
<a href="mailto:{{EMAIL}}" class="contact-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
  <span>{{EMAIL}}</span>
</a>
```

**Telegram:**
```html
<a href="https://t.me/{{TELEGRAM}}" target="_blank" rel="noopener" class="contact-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 4.6L2.5 11.1c-.7.3-.7.8 0 1l4.8 1.5 1.8 5.8c.2.5.6.6 1 .3l2.6-2.1 4.9 3.6c.5.4 1 .2 1.1-.5L21.9 5.6c.2-.8-.3-1.2-.7-1z"/><path d="M9.3 13.6l8.4-7.2"/></svg>
  <span>Telegram</span>
</a>
```

**GitHub:**
```html
<a href="https://github.com/{{GITHUB}}" target="_blank" rel="noopener" class="contact-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  <span>GitHub</span>
</a>
```

**LinkedIn:**
```html
<a href="https://linkedin.com/in/{{LINKEDIN}}" target="_blank" rel="noopener" class="contact-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  <span>LinkedIn</span>
</a>
```

## Step 3 — Output

After generating, tell the user:
- The file has been saved to `index.html`
- How to open it: `open index.html` (macOS) or just open the file in a browser
- Offer to open it immediately with a shell command
