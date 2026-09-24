import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Environment constraint: dev server must run strictly on port 3000
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets from root directory
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// Route fallback: if route does not match a file, try route.html or index.html
app.get('*', (req, res) => {
  const cleanPath = req.path.replace(/^\//, '');
  if (cleanPath) {
    const candidate = path.join(__dirname, cleanPath + '.html');
    res.sendFile(candidate, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, 'index.html'));
      }
    });
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
