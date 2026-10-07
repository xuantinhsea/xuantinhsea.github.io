# xuantinhsea.github.io

Personal website of **Nguyen Xuan Tinh, Ph.D.**, Senior Coastal & Hydrological
Specialist at Nippon Koei Co., Ltd., Tokyo.

Live at <https://xuantinhsea.github.io>.

## How it is built

One static page: plain HTML and CSS, no framework and no build step. GitHub Pages
publishes the `main` branch as it is.

```
index.html               the whole site: all content lives here
404.html                 page shown for unknown addresses
assets/css/style.css     all styling; colours and fonts are tokens at the top
assets/images/
  portrait.webp/.png     photo used on the page (cropped from photo.png)
  og-image.jpg           preview image shown when the link is shared
  apple-touch-icon.png   home-screen icon
favicon.svg              browser tab icon
sitemap.xml, robots.txt  for search engines
```

## Editing content

Everything you see is in `index.html`, one `<section>` per part of the page
(About, Services, Projects, Applications, Experience, Education, Publications,
Contact). To add an entry, copy a neighbouring `<li>` and change its text:

- **Projects, experience, education, publications** use the same row:
  a date in `<span class="when mono">` and the details beside it.
- **Applications** are `<li class="app">` cards, grouped under a small heading.
  Each has a name, a one-sentence description, the tech stack and its links
  (`Live` for a running app, `Code` for the GitHub repository).

Colours are set once at the top of `assets/css/style.css` (`--paper`, `--ink`,
`--accent`, …), with a matching dark-mode set below them.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with the same Jekyll setup as GitHub Pages: `bundle install && bundle exec jekyll serve`.
