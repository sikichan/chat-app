const router = require('express').Router()
const userRoutes = require('../controllers/userController')

router.post('/register', userRoutes.register)
router.post('/login', userRoutes.login)
router.post('/set-avatar', userRoutes.setAvatar)
router.get('/contact-list/:id', userRoutes.getContactList)

module.exports = router