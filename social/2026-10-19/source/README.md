# Elpisoft services post — 19 Oct 2026, 7:00 AM

`master.html` is the editable 2160×2160 master (HTML/CSS, brand fonts and official logo SVGs in `a/`).
`node export.js <outdir>` renders the master PNG and cuts the four 1080×1080 tiles from it
(crops: tile 1 = 0,0 · tile 2 = 1080,0 · tile 3 = 0,1080 · tile 4 = 1080,1080). Needs `playwright` and `ffmpeg-static`.

## 12:00 NN brand-awareness post
`noon.html` is the editable 1080×1350 master. `node export-noon.js <outdir>` renders `elpisoft-brand-awareness-2026-10-19-12nn.png`.
`noon-square.html` is the 2160×2160 version (laid out at 1080, rendered at 2x): `node export-noon-square.js <outdir>`. `noon.html` is the earlier 4:5 layout.
