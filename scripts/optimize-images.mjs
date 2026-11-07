// Converts originals in assets/originals -> public/img/*.webp (640w + full) and writes a manifest with natural sizes.
// Requires ffmpeg + ffprobe on PATH when regenerating; uses committed outputs in CI/Vercel when present.
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'assets/originals';
const OUT = 'public/img';
const MANIFEST = join(OUT, 'manifest.json');
mkdirSync(OUT, { recursive: true });

const sources = existsSync(SRC)
  ? readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(parse(f).ext))
  : [];

const existingManifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : null;
const allPrebuilt =
  Boolean(existingManifest) &&
  sources.every((file) => {
    const { name } = parse(file);
    return (
      existingManifest[name] &&
      existsSync(join(OUT, `${name}.webp`)) &&
      existsSync(join(OUT, `${name}-640.webp`))
    );
  });

let hasFfprobe = true;
try {
  execFileSync('ffprobe', ['-version'], { stdio: 'ignore' });
} catch {
  hasFfprobe = false;
}

if (allPrebuilt && (process.env.CI || process.env.VERCEL || !hasFfprobe)) {
  console.log('images ok (pre-optimized):', Object.keys(existingManifest).length);
  process.exit(0);
}
if (!hasFfprobe) {
  throw new Error('ffprobe/ffmpeg not found on PATH and pre-optimized public/img/*.webp files are missing.');
}

const manifest = {};
for (const file of sources) {
  const { name } = parse(file);
  const input = join(SRC, file);
  const [w, h] = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', input])
    .toString().trim().split(',').map(Number);
  manifest[name] = { w, h };
  const jobs = [
    [`${name}.webp`, w],
    [`${name}-640.webp`, Math.min(640, w)],
  ];
  for (const [out, width] of jobs) {
    const target = join(OUT, out);
    if (existsSync(target) && statSync(target).mtimeMs > statSync(input).mtimeMs) continue;
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', input, '-vf', `scale=${width}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6', target]);
    console.log('wrote', target);
  }
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log('images ok:', Object.keys(manifest).length);
