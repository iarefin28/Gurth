const express = require('express')
const router = express.Router()
const auth = require('../auth')
const diaryController = require('../controllers/diary-controller')

router.post('/addentry', auth.verify, diaryController.addDiaryEntry)
router.get('/entry/:date', auth.verify, diaryController.getEntryByDate)

module.exports = router