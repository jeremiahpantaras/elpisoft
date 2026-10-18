// Procedural score + sound design for the Elpisoft reel, mixed with the ElevenLabs VO.
// 120 BPM (beat 0.5s, bar 2s), D major. Writes audio/mix.wav (48k stereo float).
const fs = require('fs');
const SR = 48000, DUR = 59.4, N = Math.ceil(SR * DUR);
const mk = () => [new Float32Array(N), new Float32Array(N)];
const MUS = mk(), SFX = mk(), VERB = mk(), VOX = new Float32Array(N);
let seed = 12345; const rand = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const noise = () => rand() * 2 - 1;
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const S = t => Math.round(t * SR);
const TAU = Math.PI * 2;
function put(bus, i, l, r) { if (i >= 0 && i < N) { bus[0][i] += l; bus[1][i] += r; } }
const panLR = p => [Math.cos((p + 1) * Math.PI / 4), Math.sin((p + 1) * Math.PI / 4)];
// Chamberlin state-variable filter
function svf() { let lp = 0, bp = 0; return (x, fc, q = .7) => { const f = 2 * Math.sin(Math.PI * Math.min(fc, SR / 6) / SR); const hp = x - lp - bp / q; bp += f * hp; lp += f * bp; return { lp, bp, hp }; }; }

// ---------------------------------------------------------------- instruments
function pad(t0, dur, notes, gain, cutoff = 1800, att = .8, rel = 1.2, send = .5) {
  const voices = notes.flatMap(m => [-.08, 0, .08].map(d => ({ f: mtof(m) * Math.pow(2, d / 12 * .25), ph: rand(), pan: rand() * 1.6 - .8 })));
  const filt = [svf(), svf()];
  const n = S(dur + rel), i0 = S(t0);
  for (let k = 0; k < n; k++) {
    const t = k / SR;
    const env = Math.min(1, t / att) * (t > dur ? Math.max(0, 1 - (t - dur) / rel) : 1);
    if (env <= 0) continue;
    let l = 0, r = 0;
    for (const v of voices) { v.ph += v.f / SR; const s = 2 * (v.ph % 1) - 1; const [pl, pr] = panLR(v.pan); l += s * pl; r += s * pr; }
    const c = cutoff * (0.6 + 0.4 * Math.sin(TAU * .15 * (t0 + t)));
    l = filt[0](l, c).lp; r = filt[1](r, c).lp;
    const g = gain * env / voices.length * 2.2;
    put(MUS, i0 + k, l * g, r * g); put(VERB, i0 + k, l * g * send, r * g * send);
  }
}
function bass(t0, dur, m, gain) {
  const f = mtof(m), i0 = S(t0), n = S(dur + .05); let ph = 0; const fl = svf();
  for (let k = 0; k < n; k++) {
    const t = k / SR; const env = Math.min(1, t / .008) * Math.max(0, Math.min(1, (dur - t) / .05 + 1)) * Math.exp(-t * .6);
    ph += f / SR; const s = Math.sin(TAU * ph) + .35 * (2 * (ph % 1) - 1);
    const y = fl(s, 380).lp * gain * env; put(MUS, i0 + k, y, y);
  }
}
function pluck(t0, m, gain, pan = 0, send = .35, bright = 3500) {
  const f = mtof(m), i0 = S(t0), n = S(.9); let ph = 0, ph2 = 0; const fl = svf(); const [pl, pr] = panLR(pan);
  for (let k = 0; k < n; k++) {
    const t = k / SR; const env = Math.exp(-t * 7) * Math.min(1, t / .003);
    ph += f / SR; ph2 += f * 1.004 / SR;
    const s = (2 * (ph % 1) - 1) + (2 * (ph2 % 1) - 1);
    const y = fl(s, 300 + bright * Math.exp(-t * 14)).lp * gain * env * .5;
    put(MUS, i0 + k, y * pl, y * pr); put(VERB, i0 + k, y * pl * send, y * pr * send);
  }
}
function bell(t0, m, gain, pan = 0, send = .6, bus = MUS, dec = 2.2) {
  const f = mtof(m), i0 = S(t0), n = S(dec * 1.6); const [pl, pr] = panLR(pan);
  for (let k = 0; k < n; k++) {
    const t = k / SR; const env = Math.exp(-t * 3 / dec) * Math.min(1, t / .002);
    const mod = Math.sin(TAU * f * 3.5 * t) * 2.2 * Math.exp(-t * 4);
    const y = (Math.sin(TAU * f * t + mod) * .8 + Math.sin(TAU * f * 2.01 * t) * .2 * Math.exp(-t * 3)) * env * gain;
    put(bus, i0 + k, y * pl, y * pr); put(VERB, i0 + k, y * pl * send, y * pr * send);
  }
}
function kick(t0, gain, bus = MUS) {
  const i0 = S(t0), n = S(.45); let ph = 0;
  for (let k = 0; k < n; k++) {
    const t = k / SR; const f = 48 + 110 * Math.exp(-t * 32); ph += f / SR;
    const y = (Math.sin(TAU * ph) * Math.exp(-t * 7) + (k < 90 ? noise() * .25 * (1 - k / 90) : 0)) * gain;
    put(bus, i0 + k, y, y);
  }
}
function clap(t0, gain, send = .3) {
  const i0 = S(t0), n = S(.35); const fl = svf();
  for (let k = 0; k < n; k++) {
    const t = k / SR; let env = Math.exp(-t * 18);
    for (const o of [0, .011, .022]) if (t >= o && t < o + .009) env = Math.max(env, 1 - (t - o) / .009);
    const y = fl(noise(), 1400, 1.2).bp * env * gain * 1.6;
    put(MUS, i0 + k, y * .9, y); put(VERB, i0 + k, y * send, y * send);
  }
}
function hat(t0, gain, open = false, pan = .2) {
  const i0 = S(t0), n = S(open ? .35 : .06); const fl = svf(); const [pl, pr] = panLR(pan);
  for (let k = 0; k < n; k++) {
    const t = k / SR; const env = Math.exp(-t * (open ? 9 : 70));
    const y = fl(noise(), 9000, .9).hp * env * gain; put(MUS, i0 + k, y * pl, y * pr);
  }
}

// ---------------------------------------------------------------- sound design
function whoosh(tPeak, dur, gain, f0 = 250, f1 = 4500, pan0 = -.7, pan1 = .7, send = .4, bus = SFX) {
  const t0 = tPeak - dur * .65, i0 = S(t0), n = S(dur); const fl = [svf(), svf()];
  for (let k = 0; k < n; k++) {
    const u = k / n; const env = Math.pow(Math.sin(Math.PI * Math.pow(u, .9)), 2);
    const fc = f0 * Math.pow(f1 / f0, Math.sin(Math.PI * u * .5));
    const [pl, pr] = panLR(pan0 + (pan1 - pan0) * u);
    const l = fl[0](noise(), fc, 1.6).bp, r = fl[1](noise(), fc, 1.6).bp;
    const g = env * gain;
    put(bus, i0 + k, l * g * pl * 1.4, r * g * pr * 1.4); put(VERB, i0 + k, l * g * send, r * g * send);
  }
}
function impact(t0, gain, size = 1) {
  const i0 = S(t0), n = S(2.2 * size); let ph = 0; const fl = svf();
  for (let k = 0; k < n; k++) {
    const t = k / SR; const f = 38 + 70 * Math.exp(-t * 9); ph += f / SR;
    const sub = Math.sin(TAU * ph) * Math.exp(-t * 1.6 / size);
    const nz = fl(noise(), 900 * Math.exp(-t * 3) + 120).lp * Math.exp(-t * 5) * .9;
    const y = (sub * 1.1 + nz) * gain;
    put(SFX, i0 + k, y, y); put(VERB, i0 + k, nz * gain * .8, nz * gain * .8);
  }
}
function riser(t0, t1, gain, f0 = 300, f1 = 6000) {
  const i0 = S(t0), n = S(t1 - t0); const fl = [svf(), svf()]; let ph = 0;
  for (let k = 0; k < n; k++) {
    const u = k / n; const env = Math.pow(u, 2.2) * gain; const fc = f0 * Math.pow(f1 / f0, u);
    ph += (110 * Math.pow(4, u)) / SR; const tone = Math.sin(TAU * ph) * .25 + Math.sin(TAU * ph * 1.5) * .12;
    const l = fl[0](noise(), fc, 2).bp + tone, r = fl[1](noise(), fc * 1.03, 2).bp + tone;
    put(SFX, i0 + k, l * env, r * env); put(VERB, i0 + k, l * env * .5, r * env * .5);
  }
}
function revCymbal(tEnd, dur, gain) {
  const i0 = S(tEnd - dur), n = S(dur); const fl = [svf(), svf()];
  for (let k = 0; k < n; k++) {
    const u = k / n; const env = Math.pow(u, 3) * gain;
    put(SFX, i0 + k, fl[0](noise(), 7000, .8).hp * env, fl[1](noise(), 7000, .8).hp * env);
  }
}
function tick(t0, gain, f = 3200, pan = 0) {
  const i0 = S(t0), n = S(.06); const [pl, pr] = panLR(pan);
  for (let k = 0; k < n; k++) {
    const t = k / SR; const y = (Math.sin(TAU * f * t) * Math.exp(-t * 90) + (k < 40 ? noise() * .6 : 0)) * gain;
    put(SFX, i0 + k, y * pl, y * pr);
  }
}
function pop(t0, m, gain, pan = 0) {
  const i0 = S(t0), n = S(.25); let ph = 0; const f = mtof(m); const [pl, pr] = panLR(pan);
  for (let k = 0; k < n; k++) {
    const t = k / SR; ph += f * (1 + 1.2 * Math.exp(-t * 60)) / SR;
    const y = Math.sin(TAU * ph) * Math.exp(-t * 16) * gain;
    put(SFX, i0 + k, y * pl, y * pr); put(VERB, i0 + k, y * .35, y * .35);
  }
}
function thump(t0, gain) { kick(t0, gain * .8, SFX); tick(t0, gain * .25, 2500); }
function shimmer(t0, gain, notes = [86, 90, 93, 97, 98]) { notes.forEach((m, i) => bell(t0 + i * .055, m, gain * (1 - i * .1), (i % 2 ? .5 : -.5), .9, SFX, 1.5)); }
function zip(t0, dur, gain) { whoosh(t0 + dur * .5, dur, gain, 1500, 7000, -.4, .4, .2); }

// ---------------------------------------------------------------- arrangement
const CH = [
  { pad: [50, 57, 61, 64, 66], bass: 38, arp: [62, 66, 69, 73, 74, 69, 66, 64] },
  { pad: [47, 54, 57, 62, 64], bass: 35, arp: [59, 62, 66, 69, 71, 69, 66, 62] },
  { pad: [43, 50, 54, 57, 59], bass: 31, arp: [55, 59, 62, 66, 67, 66, 62, 59] },
  { pad: [45, 52, 57, 61, 64], bass: 33, arp: [57, 61, 64, 69, 71, 69, 64, 61] },
];
const chordAt = bar => CH[bar % 4];
const BARS = Math.ceil(DUR / 2);
const sec = t => (t < 6 ? 'intro' : t < 12 ? 'who' : t < 19.4 ? 'mission' : t < 24 ? 'vision' : t < 30 ? 'svc' : t < 41.5 ? 'work' : t < 42 ? 'gap' : t < 50 ? 'proc' : t < 52 ? 'build' : t < 56 ? 'end' : 'out');
const kicks = [];

for (let b = 0; b < BARS; b++) {
  const t = b * 2, c = chordAt(b), s = sec(t);
  if (t >= 56) break;
  // pad bed throughout (filter opens with the story)
  const cut = { intro: 700 + b * 250, who: 1500, mission: 2200, vision: 1800, svc: 2600, work: 3000, gap: 3000, proc: 2400, build: 3000, end: 2800 }[s];
  pad(t, 2.05, c.pad, s === 'intro' ? .16 + b * .03 : .2, cut, s === 'intro' && b === 0 ? 1.5 : .25, .6, .55);
  // bass
  if (['who', 'mission', 'vision', 'end'].includes(s)) bass(t, 1.95, c.bass, s === 'vision' ? .22 : .3);
  if (['svc', 'work', 'proc', 'build'].includes(s)) for (let e = 0; e < 4; e++) { const tt = t + e * .5 + .25; if (sec(tt) !== 'gap') bass(tt, .22, c.bass + (e === 3 ? 12 : 0), .34); bass(t + e * .5, .2, c.bass, .26); }
  // beats
  for (let q = 0; q < 4; q++) {
    const tb = t + q * .5, sq = sec(tb);
    if (['who', 'mission', 'svc', 'work', 'proc', 'build'].includes(sq)) { kick(tb, sq === 'who' ? .55 : .8); kicks.push(tb); }
    if (['svc', 'work'].includes(sq) && q % 2 === 1) clap(tb, .32);
    if (sq === 'proc' && q % 2 === 1 && tb >= 46) clap(tb, .26);
    if (['mission', 'proc'].includes(sq)) hat(tb + .25, .09);
    if (['svc', 'work', 'build'].includes(sq)) for (let x = 0; x < 4; x++) hat(tb + x * .125, x === 2 ? .11 : .05, false, x % 2 ? .35 : -.2);
  }
  // pluck arp in 16ths
  if (['mission', 'vision', 'svc', 'work', 'proc', 'build'].includes(s))
    for (let x = 0; x < 16; x++) { const tt = t + x * .125; if (sec(tt) === 'gap') continue;
      const m = c.arp[x % 8] + (x >= 8 && s === 'work' ? 12 : 0);
      pluck(tt, m, s === 'vision' ? .07 : .095, x % 2 ? .45 : -.45, .3, s === 'vision' ? 1800 : 3600); }
  // sparse intro sparkles
  if (s === 'intro' || s === 'who') for (let x = 0; x < 4; x++) if ((b * 4 + x) % 3 === 0) bell(t + x * .5 + .25, c.arp[(x * 3) % 8] + 12, .05, x % 2 ? .6 : -.6, .9);
}
// bell lead over the showcase
const LEAD = [[30, 78], [30.5, 81], [31, 83], [31.5, 81], [32, 78], [33, 76], [33.5, 74], [34, 76], [35, 78], [35.5, 81], [36, 83], [36.5, 86], [37, 85]];
LEAD.forEach(([t, m]) => bell(t + .0, m, .09, .1, .7));
// beat-cut stabs 37.5–41.5
for (let i = 0; i < 8; i++) hat(37.5 + i * .5, .12, true, i % 2 ? .4 : -.4);
// snare roll into the end card
for (let t = 50, step = .25; t < 51.95; t += step, step = Math.max(.0625, step * .9)) clap(t, .1 + .25 * (t - 50) / 2, .15);
// end: big chord + tagline motif
pad(52, 4.2, [38, 50, 57, 62, 66, 69, 73], .26, 3200, .02, 3.2, .7);
bass(52, 4.5, 38, .32);
[[52.6, 86], [53.0, 90], [53.4, 93], [53.92, 81], [54.44, 85], [54.84, 88], [55.9, 90], [56.3, 93], [56.7, 98]].forEach(([t, m], i) => bell(t, m, .075, i % 2 ? .4 : -.4, .9));
pad(56, 2.6, [50, 57, 61, 64, 66, 69], .16, 2200, .3, 2.6, .8);

// ---------------------------------------------------------------- SFX cues
whoosh(1.1, 1.8, .10, 200, 2500, -.3, .3, .8);                       // horizon line draws
riser(4.2, 5.95, .32); revCymbal(6.0, 1.4, .22);
impact(6.0, .5, 1.3); shimmer(6.05, .07);
whoosh(7.0, .9, .14, 300, 3500, .6, -.2);                            // logo slides / wordmark
whoosh(8.4, .8, .12, 400, 3000, .3, -.6);                            // logo docks
tick(8.25, .08); tick(9.48, .08);
pop(9.72, 81, .3, .5); bell(9.8, 93, .08, .6, .9, SFX, 1.2);          // pin lands
for (let i = 0; i < 9; i++) tick(9.82 + i * .1, .035, 4200 + i * 120, .5);  // coords counting
pop(10.0, 88, .12, .5);
whoosh(12.0, 1.2, .3, 150, 6000, -.9, .9, .4); impact(12.0, .38, .7);   // dawn wipe
thump(14.42, .65); thump(15.38, .6); thump(17.2, .6); zip(17.5, .45, .15); thump(18.2, .65);
whoosh(19.6, .9, .2, 200, 4000, .5, -.2, .5); impact(19.65, .25, .6);    // iris to vision
shimmer(21.0, .075, [74, 78, 81, 86, 90, 93]);
zip(23.15, .3, .3);                                                   // strike-through
whoosh(23.95, .7, .2, 4000, 300, 0, 0, .3); impact(24.02, .42, 1);     // into services
[24.42, 25.88, 27.37, 28.57].forEach((t, i) => { thump(t, .6); tick(t + .01, .14, 2600 + i * 300); pop(t + .02, 74 + [0, 4, 7, 12][i], .12); });
whoosh(30.05, .55, .32, 200, 6000, .9, -.9, .2);                      // whip pan
[30.45, 31.72, 32.6, 33.5].forEach((t, i) => whoosh(t, .55, .2, 300, 4500, .8, -.3, .3));
[33.6, 33.95, 34.3].forEach(t => pop(t, 69, .07, .3));                // tabang ripples
whoosh(34.5, .6, .22, 4000, 400, 0, 0, .3); impact(34.58, .45, .8);    // the wall
tick(36.45, .06);
for (let i = 0; i < 8; i++) { const t = 37.5 + i * .5; tick(t, .12, 2200 + i * 150, i % 2 ? .4 : -.4); whoosh(t + .05, .22, .08, 800, 5000, i % 2 ? -.5 : .5, 0, .1); }
riser(40.6, 41.62, .3); whoosh(41.95, .6, .26, 250, 5500, 0, 0, .3); impact(42.0, .4, .7);
pop(43.45, 74, .3); pop(43.5, 86, .1); zip(43.75, .35, .14); whoosh(44.6, .9, .14, 300, 3000, .3, -.3, .4);
whoosh(44.8, 1.0, .07, 600, 5000, -.6, .6, .3);                       // track draws
[[44.74, 74], [46.41, 78], [48.78, 81]].forEach(([t, m]) => { pop(t, m, .3); pop(t + .04, m + 12, .08); thump(t, .3); });
shimmer(50.05, .06, [81, 86, 90, 93]); riser(50.0, 51.95, .42, 200, 8000); revCymbal(52.0, 1.6, .25);
impact(52.0, .6, 1.6); shimmer(52.6, .065, [86, 90, 93, 98]); whoosh(53.4, .9, .1, 300, 3000, -.4, .2, .5);
tick(56.3, .12, 2000); pop(56.32, 86, .1);

// ---------------------------------------------------------------- reverb (Freeverb-style)
function freeverb(inp, room = .86, damp = .25, wet = 1) {
  const sc = SR / 44100, combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], aps = [556, 441, 341, 225];
  const out = mk();
  for (let ch = 0; ch < 2; ch++) {
    const sp = ch ? 23 : 0;
    const cb = combs.map(l => ({ b: new Float32Array(Math.round((l + sp) * sc)), i: 0, f: 0 }));
    const ab = aps.map(l => ({ b: new Float32Array(Math.round((l + sp) * sc)), i: 0 }));
    const x = inp[ch], y = out[ch];
    for (let k = 0; k < N; k++) {
      const v = x[k] * .015; let s = 0;
      for (const c of cb) { const o = c.b[c.i]; c.f = o * (1 - damp) + c.f * damp; c.b[c.i] = v + c.f * room; c.i = (c.i + 1) % c.b.length; s += o; }
      for (const a of ab) { const o = a.b[a.i]; const nv = s + o * .5; a.b[a.i] = s; s = o - s; a.i = (a.i + 1) % a.b.length; void nv; }
      y[k] = s * wet;
    }
  }
  return out;
}
const R = freeverb(VERB, .87, .3, 1.0);

// ---------------------------------------------------------------- VO
const VO = [[1, 1.0], [2, 6.6], [3, 12.4], [4, 24.3], [5, 30.6], [6, 42.2], [7, 52.6]];
for (const [n, t0] of VO) {
  const b = fs.readFileSync(`vo/vo${n}.f32`); const a = new Float32Array(b.buffer, b.byteOffset, b.length / 4);
  // level-match on speech RMS (frames above a gate)
  let e = 0, c = 0; for (let k = 0; k < a.length; k += 4) { const v = a[k] * a[k]; if (v > 1e-5) { e += v; c++; } }
  const g = 0.11 / Math.sqrt(e / Math.max(1, c)) * (n === 1 ? 2.6 : 1);
  let hp = 0, prev = 0; const i0 = S(t0);
  for (let k = 0; k < a.length; k++) { hp = .995 * (hp + a[k] - prev); prev = a[k]; if (i0 + k < N) VOX[i0 + k] += hp * g; }
}
// gentle VO compressor
{ let env = 0; for (let k = 0; k < N; k++) { const x = Math.abs(VOX[k]); env = x > env ? env + (x - env) * .01 : env * .9997; const th = .25; const gr = env > th ? Math.pow(th / env, .5) : 1; VOX[k] *= gr; } }
// sidechain envelope for ducking music under VO
const duck = new Float32Array(N);
{ let env = 0; for (let k = 0; k < N; k++) { const x = Math.min(1, Math.abs(VOX[k]) * 12); env = x > env ? env + (x - env) * .004 : env * .99993; duck[k] = env; } }
// kick pump on music during the groove sections
const pump = new Float32Array(N).fill(1);
for (const t of kicks) { const i0 = S(t); for (let k = 0; k < S(.42); k++) if (i0 + k < N) pump[i0 + k] = Math.min(pump[i0 + k], .55 + .45 * Math.min(1, k / S(.38))); }

// ---------------------------------------------------------------- mix
const L = new Float32Array(N), Rr = new Float32Array(N);
const fadeOut = k => { const t = k / SR; return t < 58.3 ? 1 : Math.max(0, 1 - (t - 58.3) / 1.1); };
for (let k = 0; k < N; k++) {
  const d = 1 - .5 * duck[k];
  const mg = .9 * d * fadeOut(k);
  const p = pump[k];
  L[k] = MUS[0][k] * mg * (0.6 + 0.4 * p) + R[0][k] * .55 * mg + SFX[0][k] * (1 - .25 * duck[k]) * fadeOut(k) + VOX[k];
  Rr[k] = MUS[1][k] * mg * (0.6 + 0.4 * p) + R[1][k] * .55 * mg + SFX[1][k] * (1 - .25 * duck[k]) * fadeOut(k) + VOX[k];
}
// soft-clip limiter
let pk = 0; for (let k = 0; k < N; k++) pk = Math.max(pk, Math.abs(L[k]), Math.abs(Rr[k]));
const pre = 1.15 / pk;
for (let k = 0; k < N; k++) { L[k] = Math.tanh(L[k] * pre) * .93; Rr[k] = Math.tanh(Rr[k] * pre) * .93; }
// write float WAV
function wav(path, chs) {
  const n = chs[0].length, bytes = n * chs.length * 4, buf = Buffer.alloc(44 + bytes);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + bytes, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(3, 20); buf.writeUInt16LE(chs.length, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4 * chs.length, 28); buf.writeUInt16LE(4 * chs.length, 32); buf.writeUInt16LE(32, 34);
  buf.write('data', 36); buf.writeUInt32LE(bytes, 40);
  let o = 44; for (let k = 0; k < n; k++) for (const c of chs) { buf.writeFloatLE(c[k], o); o += 4; }
  fs.writeFileSync(path, buf);
}
fs.mkdirSync('audio', { recursive: true });
wav('audio/mix.wav', [L, Rr]);
console.log('peak pre-limit', pk.toFixed(3), 'written', (N / SR).toFixed(2), 's');
