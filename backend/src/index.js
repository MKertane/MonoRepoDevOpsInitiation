const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Autorise les requêtes cross-origin (CORS)
app.use(bodyParser.json()); // Parse le JSON dans les requêtes

// Connexion à la base PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'blog',
  port: 5432
});

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    console.log('user ' + process.env.DB_USER);
    console.log('password ' + process.env.DB_PASSWORD);
    console.log("🔍 DB_PASSWORD:", JSON.stringify(process.env.DB_PASSWORD));
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des posts');
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création du post');
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression du post');
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Backend API démarré sur http://localhost:${port}`);
});
