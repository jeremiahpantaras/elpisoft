# Elpisoft showreel — source

- `stage/index.html` — the whole film as one GSAP timeline (1920×1080, 59.4 s). `window.renderAt(t)` draws any frame.
- `render.js` — renders frames with headless Chromium and encodes with ffmpeg: `node render.js video 60 4` (or `node render.js stills 3,12.5`).
- `audio.js` — procedural score (120 BPM, D major) + sound design, mixed with the ElevenLabs VO in `vo/`. Needs `vo/voN.f32` (48 kHz mono float) decoded from the mp3s.
- Final mux: concat `parts/list.txt` + `audio/mix.wav`, loudnorm to −14 LUFS.

Setup: `npm i playwright ffmpeg-static` in this folder.
- `poster.js` — exports the end-card thumbnail: `node poster.js out.jpg`.
- Partial re-render: `node render.js video 60 4 <segment 0-3>` re-renders one quarter of the timeline into `parts/`.
