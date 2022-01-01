const DiaryEntry = require('../models/diary-entry-model');
const User = require('../models/user-model');

addDiaryEntry = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const diaryEntry = new DiaryEntry(body);
    console.log("posting diary entry: " + JSON.stringify(diaryEntry));
    if (!diaryEntry) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    console.log("entry created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.diaryEntries.push(diaryEntry._id);
        user
            .save()
            .then(() => {
                diaryEntry
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            entry: diaryEntry
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Entry Not Posted!'
                        })
                    })
            });
    })
}

getEntryByDate = async (req, res) => {
    console.log("find entry on: ", req.params.date);
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function findEntryByDate(date) {
            console.log("find entry on " + req.params.date);
            await DiaryEntry.find({ postDate: req.params.date }, (err, entry) => {
                console.log("entry: " + JSON.stringify(entry));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!entry) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'No entry found' })
                }
                else {
                    console.log("Send the entry");
                    return res.status(200).json({ success: true, userEntry: entry })
                }
            }).catch(err => console.log(err))
        }
        findEntryByDate(req.params.date);
    }).catch(err => console.log(err))
}



module.exports = {
    addDiaryEntry,
    getEntryByDate
}