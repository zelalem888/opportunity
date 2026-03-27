const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true }, // Removed enum to allow anything (Training, Conferences, Jobs, etc)
  fundingType: { type: String, required: false }, // e.g. Fully Funded, Partially Funded, Government Funded
  duration: { type: String, required: false }, // e.g. 2 Years, 6 Months, etc.
  programStartDate: { type: Date, required: false },
  tags: [{ type: String }], // Array for attributes like "No Application Fee", "Without IELTS", "Medical Fields"
  deadline: { type: Date, required: true },
  applyLink: { type: String, required: true },
  content: { type: String, required: true } // HTML string with Base64 embedded images
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
