const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiaryEntrySchema = new Schema(
    {
        entryContents: { type: String},
        postDate: {type: String},
        postTime: {type: String}
    },
    { timestamps: true },
)

module.exports = mongoose.model('DiaryEntry', DiaryEntrySchema)