import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Environment constraint: dev server must run strictly on port 3000
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets from dist directory (built React SPA)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback: any non-static request routes to dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
