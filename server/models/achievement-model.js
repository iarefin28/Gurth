const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AchievementSchema = new Schema(
    {
        nameOfAchievement: { type: String, required: true },
        skillsUpdated: { type: [String], required: true },
        dateOfCompletion: { type: Date, required: true },
        completionNote: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Achievement', AchievementSchema)