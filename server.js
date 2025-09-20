// server.js
const app = require('./api/index');  // import your Express app
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
