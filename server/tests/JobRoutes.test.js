const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

beforeAll(async () => {
  await connectDB(); // ensure DB is ready
});

afterAll(async () => {
  await mongoose.disconnect(); // clean up DB connection
});

describe('GET /api/jobs', () => {
  it('should return jobs array', async () => {
    const res = await request(app).get('/api/jobs');
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.jobs)).toBe(true);
  }, 10000); 
});