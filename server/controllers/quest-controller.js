const Quest = require('../models/quest-model');
const User = require('../models/user-model');

createNewQuest = (req, res) => {
    console.log("hello world")
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


module.exports = {
    createNewQuest,
}