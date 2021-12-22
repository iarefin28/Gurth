const Quest = require('../models/quest-model');
const User = require('../models/user-model');

createNewQuest = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const quest = new Quest(body);
    console.log("creating quest: " + JSON.stringify(quest));
    if (!quest) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("quest created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.quests.push(quest._id);
        user
            .save()
            .then(() => {
                quest
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            quests: quest
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Quest Not Created!'
                        })
                    })
            });
    })
}

retrieveAllUserQuests = async (req, res) => {
    console.log("get all user quests");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all quests for " + email);
            await Quest.find({ ownerEmail: email }, (err, quests) => {
                console.log("quests: " + JSON.stringify(quests));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!quests) {
                    console.log("!top5Lists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Top 5 Lists not found' })
                }
                else {
                    console.log("Send the quest pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in quests) {
                        let list = quests[key];
                        let pair = {
                            _id: list._id,
                            name: list.nameOfQuest,
                            endDate: list.endDate,
                            stats: list.increase_stat,
                            ownerEmail: list.ownerEmail
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, userQuests: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}

deleteQuestById = async (req, res) => {
    console.log("delete quest with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Quest.findById({ _id: req.params.id }, (err, quest) => {
        console.log("quest found: " + JSON.stringify(quest));
        if (err) {
            return res.status(404).json({
                errorMessage: 'quest not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Quest.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(quest);
    })
}


module.exports = {
    createNewQuest,
    retrieveAllUserQuests,
    deleteQuestById
}