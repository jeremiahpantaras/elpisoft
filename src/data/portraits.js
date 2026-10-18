/**
 * Portraits for the hero social-proof stack: whatever optimised images are in src/assets/portraits/ (first five,
 * in file-name order). With none present, ClientProof shows neutral placeholder avatars instead.
 * To add photos, see docs/social-proof.md (licence check, `npm run portraits`, CREDITS.md).
 * They are illustrative: the component says so, and they are never presented as particular clients.
 */
const found = import.meta.glob('../assets/portraits/*.{webp,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })

export const PORTRAITS = Object.entries(found)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)
  .slice(0, 5)
