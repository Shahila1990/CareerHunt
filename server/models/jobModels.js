const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    company: { type: String, required: [true, 'Please Add company name'] },
    logo: { type: String }, // URL to logo image
    position: { type: String, required: [true, 'Please Add the position'] },
    role: { type: String },
    level: { type: String },
    postedAt: { type: String },
    contract: { type: String },
    location: { type: String },
    languages: [String],
    tools: [String],
    description: { type: String },
  },
  { timestamps: true }
);

jobSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Job' , jobSchema)