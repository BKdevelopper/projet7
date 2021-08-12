const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')

const multer = require('../middleware/multer')

router.post('/', auth, multer, postCtrl.createPost) 
router.post('/createComment', auth, postCtrl.createComment) 
router.delete('/deletePost/:id', auth, postCtrl.deletePost) 
router.delete('/deleteComment/:id', auth, postCtrl.deleteComment) 
router.get('/getAllComment', auth, postCtrl.getAllComment) 
router.get('/getAllPost', auth, postCtrl.getAllPost) 


module.exports = router