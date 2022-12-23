const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestSchema = new Schema(
    {
        nameOfQuest: { type: String, required: true },
        descriptionOfQuest: {type: String},
        endDate: {type: Number},
        increase_stat: { type: [String], required: true },
        ownerEmail: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Quest', QuestSchema)