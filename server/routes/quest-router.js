const express = require('express')
const router = express.Router()
const auth = require('../auth')
const QuestController = require('../controllers/quest-controller')

router.post('/quests', auth.verify, QuestController.createNewQuest)

module.exports = router