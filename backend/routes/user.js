const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup)
router.get('/', userCtrl.getAllUsers)
router.post('/login', userCtrl.login)

// router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router