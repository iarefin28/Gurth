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

module.exports = {
    addNewWorkout,
}