const Workout = require('../models/workout-model');
const User = require('../models/user-model');

addNewWorkout = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const workout = new Workout(body);
    console.log("creating quest: " + JSON.stringify(workout));
    if (!workout) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    console.log("quest created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.workouts.push(workout._id);
        user
            .save()
            .then(() => {
                workout
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            workouts: workout
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Workout Not Created!'
                        })
                    })
            });
    })
}

retrieveAllWorkouts = async (req, res) => {
    console.log("get all user workouts");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindWorkouts(email) {
            console.log("find all workouts for " + email);
            await Workout.find({ ownerEmail: email }, (err, workouts) => {
                console.log("workouts: " + JSON.stringify(workouts));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!workouts) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Workouts not found' })
                }
                else {
                    console.log("Send the quest pairs");
                    let pairs = [];
                    for (let key in workouts) {
                        let list = workouts[key];
                        let pair = {
                            _id: list._id,
                            date: list.workoutDate,
                            musclesHit: list.musclesHit,
                            exercises: list.exercises,
                            ownerEmail: list.ownerEmail
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, userWorkouts: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindWorkouts(user.email);
    }).catch(err => console.log(err))
}


retrieveAllWorkoutsByDate = async (req, res) => {
    console.log("find workout on: ", req.params.dateString);
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindWorkoutsByDate(date) {
            console.log("find all workouts on " + req.params.dateString);
            await Workout.find({ workoutDate: req.params.dateString }, (err, workouts) => {
                console.log("workouts: " + JSON.stringify(workouts));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!workouts) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'No workouts found' })
                }
                else {
                    console.log("Send the workout pairs");
                    let pairs = [];
                    for (let key in workouts) {
                        let list = workouts[key];
                        let pair = {
                            _id: list._id,
                            date: list.workoutDate,
                            musclesHit: list.musclesHit,
                            exercises: list.exercises,
                            ownerEmail: list.ownerEmail
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, userWorkouts: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindWorkoutsByDate(req.params.dateString);
    }).catch(err => console.log(err))
}


module.exports = {
    addNewWorkout,
    retrieveAllWorkouts,
    retrieveAllWorkoutsByDate
}