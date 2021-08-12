const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')


router.post('/signup', userCtrl.signup)
router.get('/', userCtrl.getAllUsers)
router.get('/:id',userCtrl.getUsers)
router.post('/login', userCtrl.login)
router.delete('/deleteAccount/:id', userCtrl.deleteAccount)
router.put('/updateEmail/:id', userCtrl.updateEmail)


module.exports = router