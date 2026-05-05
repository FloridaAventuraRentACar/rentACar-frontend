import http from 'http';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local
try {
  const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  }
  console.log('[dev-server] .env.local cargado');
} catch {
  console.warn('[dev-server] .env.local no encontrado');
}

const { default: handler } = await import('./chat.js');

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    try {
      req.body = JSON.parse(body || '{}');
    } catch {
      req.body = {};
    }

    const mockRes = {
      _status: 200,
      status(code) { this._status = code; return this; },
      setHeader(k, v) { res.setHeader(k, v); },
      json(data) {
        res.writeHead(this._status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      },
      end() { res.end(); },
    };

    Promise.resolve(handler(req, mockRes)).catch((err) => {
      console.error('[dev-server] error:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
  });
});

server.listen(PORT, () => {
  console.log(`[dev-server] API lista en http://localhost:${PORT}`);
});
