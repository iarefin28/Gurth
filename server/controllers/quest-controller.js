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

module.exports = {
    createNewQuest,
    retrieveAllUserQuests
}