const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Scholarship = require('./models/Scholarship');
const Subscriber = require('./models/Subscriber');

dotenv.config();

const app = express();

// Increase JSON limit to handle Base64 embedded images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scholarship-hub')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB error:', err));

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  // Only use this temporarily to create the first admin
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
    
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- SCHOLARSHIP ROUTES ---
// Get all scholarships (supports sorting & filtering)
app.get('/api/scholarships', async (req, res) => {
  try {
    const { university, country, category, searchQuery, page = 1, limit = 16 } = req.query;
    let query = {};
    if (university) query.university = { $regex: university, $options: 'i' };
    if (country) query.country = { $regex: country, $options: 'i' };
    
    let andConditions = [];

    if (searchQuery) {
        andConditions.push({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { university: { $regex: searchQuery, $options: 'i' } }
            ]
        });
    }

    if (category && category !== 'All') {
        andConditions.push({
            $or: [
                { category: { $regex: category, $options: 'i' } },
                { tags: { $regex: category, $options: 'i' } },
                { country: { $regex: category, $options: 'i' } }
            ]
        });
    }

    if (andConditions.length > 0) {
        query.$and = andConditions;
    }

    const limitNum = parseInt(limit);
    const skipNum = (parseInt(page) - 1) * limitNum;

    const total = await Scholarship.countDocuments(query);

    let queryObj = Scholarship.find(query).sort({ createdAt: -1 });
    if (limitNum > 0) {
      queryObj = queryObj.skip(skipNum).limit(limitNum);
    }

    const scholarships = await queryObj;

    res.json({
      scholarships,
      totalPages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
      currentPage: parseInt(page),
      totalOpportunities: total
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/scholarships/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create scholarship (Protected)
app.post('/api/scholarships', auth, async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    const saved = await newScholarship.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update scholarship (Protected)
app.put('/api/scholarships/:id', auth, async (req, res) => {
  try {
    const updated = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Scholarship not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete scholarship (Protected)
app.delete('/api/scholarships/:id', auth, async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- SUBSCRIBER ROUTES ---
app.post('/api/subscribers', async (req, res) => {
  try {
    const { email } = req.body;
    let sub = await Subscriber.findOne({ email });
    if (sub) return res.status(400).json({ message: 'Email already subscribed' });
    
    sub = new Subscriber({ email });
    await sub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
