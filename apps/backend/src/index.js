require('dotenv').config();

const express = require('express');
const cors = require('cors');

const articlesRoutes = require('./routes/articles');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');
const authorsRoutes = require('./routes/authors');
const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const healthRoutes = require('./routes/health');
const { notFound } = require('./middleware/not-found');
const { errorHandler } = require('./middleware/error-handler');

const app = express();
const port = Number(process.env.PORT || process.env.BACKEND_PORT || 4000);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    data: {
      service: 'IT Blog API',
      docs: [
        '/api/health',
        '/api/articles',
        '/api/categories',
        '/api/tags',
        '/api/search?q=railway'
      ]
    }
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
});
