const express = require('express')
const router = express.Router()
const auth = require('../auth')
const workoutController = require('../controllers/workout-controller')

router.post('/workouts', auth.verify, workoutController.addNewWorkout)
router.get('/allworkouts', auth.verify, workoutController.retrieveAllWorkouts)
router.get('/datedworkouts/:dateString', auth.verify, workoutController.retrieveAllWorkoutsByDate)

module.exports = router