# Unlisted pages

`/sta-catalina` is a video page that is reachable only by its URL: production `https://www.elpisoft.com/sta-catalina`, local `http://localhost:<port>/sta-catalina` (any port).

## What keeps it unlisted

- Not linked from the header, menus, footer or any page.
- In the route registry (`src/seo/routeMeta.js`) with `indexable: false`: it is prerendered (so a direct visit works on Vercel), served with `noindex` and no canonical, and left out of `sitemap.xml`.
- `vercel.json` sends `X-Robots-Tag: noindex` for everything under `/media/`.
- `robots.txt` does not mention it on purpose: a Disallow line would advertise the URL.
- `npm run check:seo` fails if the page is missing, indexable, or in the sitemap.

Unlisted is not private: anyone with the link (or the direct file URL under `/media/`) can watch it.

## The video

- Page: `src/pages/StaCatalinaPage.jsx`. Files: `public/media/sta-catalina.mp4` and `public/media/sta-catalina-poster.jpg`.
- The site copy is a 1080p web encode (about 20 MB). The original in `showreel/` is 134 MB, over GitHub's 100 MB limit, so it is not used.
- To replace it: re-encode and overwrite the two files, keeping the names.

```sh
ffmpeg -i "showreel/STA. CATALINA.mp4" -c:v libx264 -preset slow -crf 23 -maxrate 6M -bufsize 12M \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/media/sta-catalina.mp4
ffmpeg -ss 20 -i public/media/sta-catalina.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 public/media/sta-catalina-poster.jpg
```

## Adding another unlisted page

Add a route to `ROUTES` with `indexable: false`, a page under `src/pages/`, a `<Route>` in `src/App.jsx`, and its path to the unlisted list in `scripts/check-seo.mjs`.
