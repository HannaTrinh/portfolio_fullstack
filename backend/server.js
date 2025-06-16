const connect = require('./connect');
const express = require('express');
const cors = require('cors');
const posts = require('./postRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(posts);

connect.connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });