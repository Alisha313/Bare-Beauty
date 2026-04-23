const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = Number(process.env.PORT) || 5500;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function sendResponse(res, statusCode, headers, body) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function resolveRequestPath(requestUrl) {
  const cleanPath = decodeURIComponent((requestUrl || '/').split('?')[0]);
  const normalizedPath = cleanPath === '/' ? '/index.html' : cleanPath;
  const targetPath = path.normalize(path.join(ROOT_DIR, normalizedPath));

  if (!targetPath.startsWith(ROOT_DIR)) {
    return null;
  }

  return targetPath;
}

function getFilePath(requestUrl) {
  const targetPath = resolveRequestPath(requestUrl);

  if (!targetPath) {
    return null;
  }

  if (path.extname(targetPath)) {
    return targetPath;
  }

  return `${targetPath}.html`;
}

function createServer() {
  return http.createServer((req, res) => {
    const filePath = getFilePath(req.url);

    if (!filePath) {
      sendResponse(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
      return;
    }

    fs.stat(filePath, (statError, stats) => {
      if (statError || !stats.isFile()) {
        sendResponse(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const stream = fs.createReadStream(filePath);

      stream.on('open', () => {
        res.writeHead(200, { 'Content-Type': contentType });
      });

      stream.on('error', () => {
        if (!res.headersSent) {
          sendResponse(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
        } else {
          res.destroy();
        }
      });

      stream.pipe(res);
    });
  });
}

function listen(port) {
  const server = createServer();

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      listen(port + 1);
      return;
    }

    console.error('Frontend server failed to start:', error);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`Bare Beauty frontend running at http://127.0.0.1:${port}`);
  });
}

listen(DEFAULT_PORT);
