const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        quests: [{type: ObjectId, ref: 'Quest'}],
        skills: {type: [Object]},
        workouts: [{type: ObjectId, ref: 'Workout'}],
        diaryEntries: [{type: ObjectId, ref: 'DiaryEntries'}],
        todo: {type: [String]},
        achievement: [{type: ObjectId, ref: 'Achievement'}],
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
