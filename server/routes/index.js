const router = require('express').Router()
const userController = require('../controllers/userController')
const msgController = require('../controllers/msgController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/set-avatar', userController.setAvatar)
router.get('/contact-list/:id', userController.getContactList)

router.post('/add-msg', msgController.addMsg)
router.post('/get-msgs', msgController.getMsgs)

module.exports = router