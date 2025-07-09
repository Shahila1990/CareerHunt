const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/jobModels');
const data = require('./data.json');
const { sub } = require('date-fns'); 

dotenv.config();

const parsePostedAt = (postedAt) => {
  const now = new Date();

  if (postedAt.includes('mo')) {
    const num = parseInt(postedAt);
    return sub(now, { months: num });
  } else if (postedAt.includes('w')) {
    const num = parseInt(postedAt);
    return sub(now, { weeks: num });
  } else if (postedAt.includes('d')) {
    const num = parseInt(postedAt);
    return sub(now, { days: num });
  } else {
    return now;
  }
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Job.deleteMany();

    const enrichedData = data.map((job) => ({
      ...job,
      postedDate: parsePostedAt(job.postedAt), 
    }));

    await Job.insertMany(enrichedData);
    console.log('Data imported with postedDate!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

importData();
