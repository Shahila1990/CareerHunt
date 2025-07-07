const express = require('express')
const router = express.Router()
const {validateObjectId} =require('../middleware/errorHandler')
const {getJobs,getSingleJob,createJob,updateJob,deleteJob} = require('../controllers/jobsController')
const {protect, isAdmin} = require('../middleware/authMiddleware')

//Get all jobs
router.get('/', getJobs);

//Get single job
router.get('/:id', validateObjectId, getSingleJob);

//Create Job
router.post('/', protect, isAdmin, createJob);

//Update job
router.put('/:id', protect, isAdmin, validateObjectId, updateJob);

//Delete job
router.delete('/:id', protect, isAdmin, validateObjectId, deleteJob);

module.exports = router