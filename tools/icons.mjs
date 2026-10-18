#!/usr/bin/env node
// Generates app icons (PNG) without dependencies: gradient tile with five sound bars.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); };
function png(size, px) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; for (let x = 0; x < size; x++) { const o = y * (size * 4 + 1) + 1 + x * 4; const c = px(x + 0.5, y + 0.5); raw[o] = c[0]; raw[o + 1] = c[1]; raw[o + 2] = c[2]; raw[o + 3] = c[3]; } }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
const A = [59, 91, 253], B = [124, 58, 237];
const BARS = [[16, 27, 37], [24, 19, 45], [32, 24, 40], [40, 29, 35], [48, 26, 38]]; // x, y1, y2 in a 64 grid
function icon(size, { radius, scale }) {
  const S = size / 64, R = radius * S;
  const cov = (d) => Math.max(0, Math.min(1, 0.5 - d)); // anti-aliasing from signed distance (px)
  return png(size, (x, y) => {
    // rounded-rect mask
    let a = 1;
    if (R > 0) { const cx = Math.min(Math.max(x, R), size - R), cy = Math.min(Math.max(y, R), size - R); a = cov(Math.hypot(x - cx, y - cy) - R); }
    if (a <= 0) return [0, 0, 0, 0];
    const t = (x + y) / (2 * size);
    let col = A.map((v, i) => Math.round(v + (B[i] - v) * t));
    // bars (capsules), scaled around the centre
    const gx = 32 + (x / S - 32) / scale, gy = 32 + (y / S - 32) / scale, w = 2.5;
    let d = Infinity;
    for (const [bx, y1, y2] of BARS) { const py = Math.min(Math.max(gy, y1), y2); d = Math.min(d, Math.hypot(gx - bx, gy - py) - w); }
    const m = cov(d * S * scale);
    col = col.map((v) => Math.round(v + (255 - v) * m));
    return [col[0], col[1], col[2], Math.round(a * 255)];
  });
}
const dir = path.join(ROOT, "icons");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "icon-192.png"), icon(192, { radius: 18, scale: 1 }));
fs.writeFileSync(path.join(dir, "icon-512.png"), icon(512, { radius: 18, scale: 1 }));
fs.writeFileSync(path.join(dir, "icon-512-maskable.png"), icon(512, { radius: 0, scale: 0.78 }));
fs.writeFileSync(path.join(dir, "apple-touch-icon.png"), icon(180, { radius: 0, scale: 0.9 }));
console.log("icons written to icons/");
