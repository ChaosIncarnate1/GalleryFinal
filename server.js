const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Image Gallery Server!');
});

// Route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // Handle image upload
  res.json({ imagePath: req.file.path });
});

// Route to serve images
app.get('/images/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
