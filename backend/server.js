const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
const weatherRoutes = require('./routes/weatherRoutes');

app.use(cors());

app.use(express.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api', weatherRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
