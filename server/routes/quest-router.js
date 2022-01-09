const express = require('express')
const router = express.Router()
const auth = require('../auth')
const questController = require('../controllers/quest-controller')

router.post('/quests', auth.verify, questController.createNewQuest)
router.get('/allquests', auth.verify, questController.retrieveAllUserQuests)
router.delete('/quests/:id', auth.verify, questController.deleteQuestById)

router.post('/skills', auth.verify, questController.addSkill)
router.post('/updateskills', auth.verify, questController.updateSkills)
router.get('/allskills', auth.verify, questController.retrieveAllUserSkills)
router.post('/todo', auth.verify, questController.addToDoEvent)
router.get('/todoevents', auth.verify, questController.retrieveAllUserEvents)

module.exports = router