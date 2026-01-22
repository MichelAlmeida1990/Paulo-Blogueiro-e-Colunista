export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const fs = require('fs');
  const path = require('path');
  const postsFile = path.join(process.cwd(), 'data', 'posts.json');

  try {
    if (req.method === 'GET') {
      // Read posts
      if (fs.existsSync(postsFile)) {
        const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
        res.status(200).json(posts);
      } else {
        res.status(200).json([]);
      }
    } else if (req.method === 'POST') {
      // Check authentication (simple token-based)
      const authToken = req.headers.authorization;
      if (authToken !== 'Bearer admin2026') {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Save posts
      const posts = req.body;
      
      // Ensure data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
