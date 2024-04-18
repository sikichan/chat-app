const router = require('express').Router()
const { register, login, setAvatar } = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)
router.post('/set-avatar', setAvatar)

module.exports = router