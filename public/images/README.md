# How to Add Photos to Your Website

Hey Rhys! Drop photos here and they auto-appear on your site.

## Quick Start
1. Open `public/images/`
2. Find your category (weddings, sports, etc.)
3. Drag and drop photos
4. Rename using format below
5. Tell Holden — he pushes live in ~5 min

## Photo Naming
Format: `category-client-###.jpg`

Good: `wedding-johnson-001.jpg`, `skiing-vail-jumps-005.jpg`
Bad: `IMG_4827.jpg`, `My Photo!!!.jpg`

Rules: lowercase, hyphens, no special chars, sequential numbers (001, 002, not 1, 2)

## Where Photos Go
| Type | Folder |
|---|---|
| Weddings | `portfolio/weddings/` |
| Graduations | `portfolio/graduations/` |
| Team sports | `portfolio/sports/` |
| Action sports (skiing, biking, climbing) | `portfolio/action-sports/` |
| Headshots | `portfolio/headshots/` |
| Family sessions | `portfolio/families/` |
| Events | `portfolio/events/` |
| Homepage hero (your best 1-3) | `hero/` |
| Photos of YOU | `about/` |
| Not sure? | `_DROP_PHOTOS_HERE/` |

## Featured Photos
Every category has a `_featured/` subfolder — drop your 3-5 BEST there. They auto-promote to the homepage and to the top of the category gallery.

## File Info
- Drop JPGs straight from camera
- Holden converts to WebP later
- Keep under 10MB per photo if you can
- Hero photos: 1920x1080 minimum, landscape orientation preferred

## Folder Tree Reference
```
public/images/
├── _DROP_PHOTOS_HERE/      ← anything you're unsure about
├── hero/                    ← homepage hero (your 1-3 best)
├── about/                   ← photos of you for the About page
├── testimonials/            ← client photos for review quotes
└── portfolio/
    ├── weddings/
    ├── graduations/
    ├── sports/
    ├── action-sports/
    ├── headshots/
    ├── families/
    └── events/
```
