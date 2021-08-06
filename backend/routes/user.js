const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
//const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup)
router.get('/', userCtrl.getAllUsers)
router.get('/:id',userCtrl.getUsers)
router.post('/login', userCtrl.login)
router.delete('/deleteAccount/:id', userCtrl.deleteAccount)
router.put('/updateEmail/:id', userCtrl.updateEmail)
//router.get("/logout", userCtrl.logout)

// router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router