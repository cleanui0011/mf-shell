require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/mf-shell/', express.static(path.join(__dirname, 'dist', 'mf-shell')));

// For SPA: route all other requests to index.html
app.get('/{*splat}', (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
