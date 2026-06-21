# Aravind Vojjala — Cinematic Portfolio Hero

## Setup

```bash
npm install
npm run dev       # Development server → http://localhost:3000
npm run build     # Production build
```

## Adding Your Video

Place your talking-head video at:
```
public/video/intro.mp4
```

The component references `/video/intro.mp4`. Supported formats: `.mp4` (H.264 recommended for widest browser compat).

> **Tip:** For a premium feel, use a 1080p or 4K video with clean lighting.
> The component applies its own cinematic dark gradient + ambient blur — you don't need to pre-process the video.

## File Structure

```
app/
├── components/
│   ├── VideoIntro.tsx        # Main hero section
│   └── CinematicLayer.tsx    # Three.js particle / bokeh layer
├── styles/
│   ├── VideoIntro.module.css # Hero styles
│   ├── CinematicLayer.module.css
│   └── Page.module.css       # About section
├── layout.tsx                # Google Fonts: Bebas Neue, Inter, DM Serif Display
├── globals.css
└── page.tsx
public/
└── video/
    └── intro.mp4             ← PUT YOUR VIDEO HERE
```

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--orange` | `#E8722A` | Accent, tagline, glow |
| `--blue-monitor` | `#4A9EDB` | Particle cool tones |
| `--cream` | `#F5F0EA` | Primary text |
| `--charcoal` | `#0A0A0C` | Background |

## Customizing Content

Edit `VideoIntro.tsx`:
- `nameChars` array → your name split by word
- tagline text, role text, subtitle

Edit `page.tsx`:
- Bio paragraph
- Skill groups
- Contact email
