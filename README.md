# xuantinhsea.github.io

Academic homepage of **Nguyen Xuan Tinh, Ph.D.**, Senior Hydrologist at Nippon Koei Co., Ltd., Tokyo.

Live at <https://xuantinhsea.github.io/>.

## Editing content

Everyday updates only touch the YAML files in `_data/`. Edit one on GitHub,
commit, and GitHub Pages rebuilds the site in about a minute.

| File | What it controls |
| --- | --- |
| `_data/profile.yml` | Name, positions, contact links, photo, short bio, education, experience, honours, memberships, footer text |
| `_data/news.yml` | News list, newest first (more than 10 items collapse behind "Show More") |
| `_data/publications.yml` | Papers; `selected: true` also shows a paper on the home page |
| `_data/apps.yml` | Applications; `selected: true` also shows an app on the home page |
| `_data/projects.yml` | Recent consulting projects |
| `_data/navigation.yml` | Links in the top menu |

**Adding a paper:** copy an entry in `_data/publications.yml` and change the
fields. Your name is highlighted automatically in `authors` (all spellings under
`name_variants` in `profile.yml`). Optional extras:

- `cover:` an image in `assets/images/covers/` (600 × 400 works well)
- `bibtex:` a `.bib` file in `assets/bibtex/` — this adds the **Cite** button

## Files

```
_config.yml              site title, description and address
_layouts/default.html    page shell: <head>, navbar, footer, scripts
_includes/               navbar, footer and the card widgets
index.html               home page (the order of cards is set here)
publications.html        all publications, by year
applications.html        all applications, by category
assets/css/global.css    styles, including dark mode
assets/js/common.js      theme toggle, "Show More" lists, background animation
assets/images/           photo, cover images, icons
assets/bibtex/           citation files
```

## Preview locally

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000/
```

## Credits

The layout follows the card design of
[academic-homepage](https://github.com/luost26/academic-homepage) by Shitong Luo
(MIT License), as used on [shengxiang-lin.github.io](https://shengxiang-lin.github.io/).
