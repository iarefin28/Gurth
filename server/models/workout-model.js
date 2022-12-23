const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutSchema = new Schema(
    {
        workoutDate: { type: String, required: true },
        musclesHit: {type: String},
        exercises: { type: [String], required: true },
        ownerEmail: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Workout', WorkoutSchema)