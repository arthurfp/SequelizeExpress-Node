const express = require('express');

const app = express();

function middleware(req, res, next) {
  const { name } = req.query;
  if (!name) {
    res.status(403).json({
      message: 'Missing required parameter',
    });
  } else {
    next();
  }
}

function logMiddleware(req, res, next) {
  console.log('req params =>', req.method, req.query, req.params);
  next();
}

app.use(logMiddleware);

app.use('/api', middleware);

// Load a static middleware
app.use(
  express.static('static', {
    extensions: ['html', 'htm', 'js', 'css'],
  }),
);

// route
app.get('/test', (req, res) => {
  res.json({
    message: 'test',
  });
});

app.listen(3000, () => {
  console.log('server is runing');
});
