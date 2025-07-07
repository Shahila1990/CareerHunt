const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModels');

//@desc  get all jobs
//@route GET/api/jobs
//@access Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.status(200).json(jobs);
});

//@desc  get single job
//@route GET/api/jobs/:id
//@access Private
const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found!');
  }
  res.status(200).json(job);
});

//@desc  Create job
//@route POST/api/jobs
//@access Private
const createJob = asyncHandler(async (req, res) => {
  const { company, position } = req.body;

  // Manual validation
  if (!company || !position) {
    res.status(400);
    throw new Error('Please provide both company and position');
  }

  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

//@desc  Update job
//@route PUT/api/jobs/:id
//@access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedJob);
});

//@desc  Delete job
//@route DELETE/api/jobs/:id
//@access Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.status(200).json({ message: 'Job deleted successfully' });s
});

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
