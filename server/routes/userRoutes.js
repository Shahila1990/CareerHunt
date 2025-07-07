const express = require('express')
const router = express.Router()
const {saveJob, unsaveJob, getSavedJobs} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/save/:jobId' ,protect, saveJob)
router.delete('/save/:jobId', protect, unsaveJob)
router.get('/saved', protect, getSavedJobs)

module.exports = router