// Tiny static server for dist/ (no dependencies). Usage: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const port = Number(process.argv[2] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.ics': 'text/calendar', '.txt': 'text/plain',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(root, path));
    if (!file.startsWith(root)) throw new Error('forbidden');
    const s = await stat(file);
    if (!s.isFile()) throw new Error('nf');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    try { res.end(await readFile(join(root, '404.html'))); } catch { res.end('Not found'); }
  }
}).listen(port, () => console.log(`Define preview: http://localhost:${port}/`));
