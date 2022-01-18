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

        // DOES THIS QUEST BELONG TO THIS USER?
        async function asyncFindUser(quest) {
            User.findOne({ email: quest.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    let index = user.quests.indexOf(req.params.id); //
                    user.quests.splice(index, 1);
                    user.save().then(() => {
                        Quest.findOneAndDelete({ _id: req.params.id }, () => {
                            return res.status(200).json({});
                        }).catch(err => console.log(err))
                    })
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


addSkill = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    console.log("creating skill: " + JSON.stringify(body));
    if (!JSON.stringify(body)) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("skill created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.skills.push([body.skillName, 0]);
        user
            .save()
            .then(() => {
                        return res.status(201).json({})
                    }).catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Skill Not Created!'
                        })
                    })
            });
}


retrieveAllUserSkills = async (req, res) => {
    console.log("get all user skills");
    await User.findOne({ _id: req.userId }, (err, user) => {
        let userSkills = user.skills;
        console.log(userSkills);
        return res.status(200).json({ success: true, userSkills: userSkills })
    }).catch(err => console.log(err))
}


//this backend code just updates the skills by one level. 
//maybe later will implement functionalities so different quests can add different amount of stat points to a skill
//and then with this new idea maybe sort the quests on the quest home page by the total amount of skill points - to represent some kind of priority system
updateSkills = (req, res) => {
    const body = req.body;
    console.log(body.skillsToUpdate);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    console.log("updating following skills: " + JSON.stringify(body));
    if (!JSON.stringify(body)) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("skill updating for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        let newSkills = [];
        (user.skills).forEach(element => {
            if(body.skillsToUpdate.includes(element[0])){
                newSkills.push([element[0], element[1]+1]);
            }
            else{
                newSkills.push([element[0], element[1]]);
            }
        })
        console.log("updated skills" + newSkills);
        user.skills = newSkills;
        console.log("updating the user's skill" + user.skills)
        user.save().then(() => {
                //console.log("skills" +user.skills[0].skillTuple)
                return res.status(200).json({ success: true, userSkills: user.skills })
            }).catch(error => {
                return res.status(400).json({
                    errorMessage: 'Skills not updated!'
                })
            })
    })
}



addToDoEvent = (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    console.log("creating event: " + JSON.stringify(body));
    if (!JSON.stringify(body)) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("event created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("event found: " + JSON.stringify(user));
        let eventExists = false; 
        for(let i = 0; i < user.todo.length; i++){
            if(user.todo[i] === body.nameOfEvent){
                eventExists = true;
            }
        }
        if(!eventExists){
            user.todo.push(body.nameOfEvent);
        }
        else{
            return res.status(400).json({
                errorMessage: 'Event with the same name already exists',
            })
        }
        user
            .save()
            .then(() => {
                        return res.status(201).json({})
                    }).catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Event Not Created!'
                        })
                    })
            });
}

deleteToDoEvent = async (req, res) => {
    console.log("delete " + req.params.nameOfEvent)
    
    User.findOne({ _id: req.userId }, (err, user) => {
        let newEvents = [];
        for(let i=0; i < user.todo.length; i++){
            if(req.params.nameOfEvent === user.todo[i]){

            }
            else{
                console.log(req.params.nameOfEvent + " " + user.todo[i])
                newEvents.push(user.todo[i]);
            }
        }
        console.log(newEvents)
        user.todo = newEvents;
        user
            .save()
            .then(() => {
                        return res.status(201).json({})
                    }).catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Not deleted!'
                        })
                    })
            });
}



retrieveAllUserEvents = async (req, res) => {
    await User.findOne({ _id: req.userId }, (err, user) => {
        let todo = user.todo;
        return res.status(200).json({ success: true, todo: todo })
    }).catch(err => console.log(err))
}


module.exports = {
    createNewQuest,
    retrieveAllUserQuests,
    deleteQuestById,
    addSkill,
    updateSkills,
    retrieveAllUserSkills,
    addToDoEvent,
    deleteToDoEvent,
    retrieveAllUserEvents
}