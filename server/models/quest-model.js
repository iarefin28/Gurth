const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestSchema = new Schema(
    {
        nameOfQuest: { type: String, required: true },
        time_lim: {type: Number},
        increase_stat: { type: [String], required: true },
        ownerEmail: { type: String }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Quest', QuestSchema)