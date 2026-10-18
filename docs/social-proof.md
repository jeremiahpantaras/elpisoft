# Hero social proof ("15 clients served · 4.5 / 5 client rating")

Component: `src/components/ui/ClientProof.jsx` (placed under the hero's call-to-action note in
`src/components/sections/home/HomeHero.jsx`).

## The figures
- Set in `src/config/brand.js` -> `BRAND.socialProof` (`clients`, `rating`, `maxRating`). Nothing else on the site
  repeats them.
- The rating is shown only as a plain **"client rating"**: never label it Google, Clutch or any other platform's
  rating unless it really comes from that source. If it ever does, change the wording and link to that source.
- Keep the underlying client feedback on file (surveys, messages, reviews) so the number can be substantiated.
- To hide just the rating, or the whole component, remove it from `ClientProof.jsx` / `HomeHero.jsx`: no other code
  depends on it.

## The portraits
The stack shows **illustrative** portraits, not particular clients, and says so ("Portraits are illustrative.").
Until photos are added it shows neutral illustrated placeholder avatars in Elpisoft colours.

To add real stock portraits (1 to 5; five looks best):
1. **Choose photos.** Download from **Unsplash** (free tier; not "Unsplash+", which is paid). Pick adults who look
   professional and approachable, a natural mix of men and women, in a range of Asian backgrounds that reflects
   your Philippines and UAE audience, with the face centred and well lit (they are shown at about 44 px).
2. **Check the licence for each.** Commercial use must be allowed. Avoid Pexels for these (its licence says "Don't
   imply endorsement of your product by people or brands on the imagery"). Never use photos from social media or
   of people you know without their permission.
3. **Save the originals** in `src/assets/portraits/source/` (this folder is not committed).
4. **Optimise:** `npm run portraits` (needs `cwebp`; macOS: `brew install webp`). It writes
   `src/assets/portraits/01-….webp` and so on.
5. **Record each photo** in `src/assets/portraits/CREDITS.md` (photographer, URL, licence, date).
6. Build and check the hero on desktop and mobile, then commit the `.webp` files and `CREDITS.md`.

If you later use **real client photos**, get each client's permission for public use first, replace the generic
caption with wording that matches ("Photos shared with permission"), and add nothing that names or quotes a client
without their consent.

## The shimmer
A soft highlight (white with a trace of the Dawn colours) crosses the stack in about 1.3 s and rests for about
5.7 s (7 s loop). It is CSS only (`.client-proof-shine` in `src/index.css`), transform-based, clipped to the stack,
and switched off for visitors who prefer reduced motion.
