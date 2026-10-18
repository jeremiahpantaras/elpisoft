# Inventory Management System: case study and service

- Case study: `/work/inventory-management-system` (data in `PROJECTS` in `src/data/projects.js`, under `caseStudy`; page in `src/pages/ProjectDetailPage.jsx`).
- Service: `/services/inventory-management-systems` (entry `inventory` in `src/data/services.js`).
- Both appear in the sitemap, the Services menu, the footer and the home marquee automatically.

## Rules for the copy

- The case study describes only what the screenshots show. It is an Elpisoft product: no client, results, figures or technology are claimed.
- The service page keeps "Core features" (shown in our own system) separate from "Built to your needs" (multiple branches, staff accounts, barcode and QR scanning, POS or sales connection). Never move an item from the second group into the case study unless a screenshot shows it.
- The dashboard's two chart panels are empty in the current capture, so charts are not claimed. Add them to `capabilityGroups` once a capture shows them with data.

## Replacing the screenshots

Originals live in `src/assets/images/ims/source/` (gitignored, never committed). Capture only the app viewport (no browser tabs or URL bar), use a neutral workspace name and demo items, including at least one low-stock and one out-of-stock item.

```sh
cd src/assets/images/ims/source
cwebp -q 82 -m 6 -resize 1600 0 "<capture>.png" -o ../../optimized/ims-<name>.webp   # inventory | dashboard | reports | start
```

Then update `width` and `height` for each entry in `caseStudy.gallery` (check with `sips -g pixelWidth -g pixelHeight <file>`), and the alt text if the screen changed. Targets: 150 kB or less per file.

Before publishing, check every screenshot for: workspace or business names, personal or customer data, browser chrome, and the in-app product name if it should not appear.
