const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/scholarship-hub');
    
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = new User({
        username: 'admin',
        password: hashedPassword
      });
      await admin.save();
      console.log('Admin user created successfully! Username: admin | Password: admin123');
    } else {
      console.log('Admin user already exists.');
    }
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding admin user', err);
    process.exit(1);
  }
};

seedAdmin();
