const express = require('express')
const router = express.Router()
const auth = require('../auth')
const QuestController = require('../controllers/quest-controller')

router.post('/quests', auth.verify, QuestController.createNewQuest)
router.get('/allquests', auth.verify, QuestController.retrieveAllUserQuests)
router.delete('/quests/:id', auth.verify, QuestController.deleteQuestById)

module.exports = router