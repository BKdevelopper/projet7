const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
//const auth = require('../middleware/auth')

const multer = require('../middleware/multer')
router.put('/:id', multer, postCtrl.updatePost)
router.post('/', multer, postCtrl.createPost)
router.post('/createComment', postCtrl.createComment)
router.post('/like', postCtrl.createLike)
router.get('/getAllComment', postCtrl.getAllComment)
router.delete('/deletePost/:id', postCtrl.deletePost)
router.get('/getAllPost', postCtrl.getAllPost)
router.get('/getPostByID/:id', postCtrl.getPostByID)

module.exports = router