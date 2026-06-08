import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy endpoint for OpenAI
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorData = await response.text();
      try {
        return res.status(response.status).json(JSON.parse(errorData));
      } catch (e) {
        return res.status(response.status).send(errorData);
      }
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error forwarding to OpenAI:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
