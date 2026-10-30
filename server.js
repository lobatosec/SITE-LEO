const http = require('http');
const fs = require('fs');
const path = require('path');
const { syncEmplaviBlog } = require('./update_blog');

let PORT = parseInt(process.env.PORT || '9001', 10);
const HOST = '127.0.0.1';
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4'
};

const server = http.createServer(async (req, res) => {
  let safePath = decodeURIComponent(req.url.split('?')[0]);

  if (safePath === '/api/blog-posts') {
    try {
      const data = await syncEmplaviBlog();
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      return res.end(JSON.stringify(data));
    } catch (err) {
      const fallbackPath = path.join(BASE_DIR, 'blog-posts.json');
      if (fs.existsSync(fallbackPath)) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        return res.end(fs.readFileSync(fallbackPath, 'utf8'));
      }
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.normalize(path.join(BASE_DIR, safePath));
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end('403 Acesso Negado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      return res.end('404 Arquivo Não Encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(portToTry) {
  server.listen(portToTry, HOST, () => {
    console.log(`\n======================================================`);
    console.log(`[V2 Server Ativo e Pronto!]`);
    console.log(`> Loopback IP : http://127.0.0.1:${portToTry}`);
    console.log(`> Localhost   : http://localhost:${portToTry}`);
    console.log(`======================================================\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EACCES' || err.code === 'EADDRINUSE') {
    console.warn(`[Aviso] Porta ${PORT} indisponível (${err.code}). Tentando porta 9001...`);
    PORT = 9001;
    setTimeout(() => startServer(PORT), 200);
  } else {
    console.error('Erro no servidor:', err);
  }
});

startServer(PORT);
