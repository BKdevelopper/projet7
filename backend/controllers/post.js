const conn = require('../utils/db')
const fs = require('fs');

exports.createPost = (req, res, next) => {
 
  const msg = req.body.message
  const user = req.body.uid
  const picture = req.file ?
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}` :
    "" 
  var post = {
    "message": msg,
    "users_idUser": user,
    "picture": picture
  }

  conn.query('INSERT INTO post SET ?', post, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    

    return res.status(201).json(results.insertId)
  })
}

exports.createComment = (req, res, next) => {
  const text = req.body.text
  const user = req.body.users_idUser
  const post = req.body.post_idPost
  var comment = {
    "text": text,
    "users_idUser": user,
    "post_idPost": post
  }

  conn.query('INSERT INTO comment SET ?', comment, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(results.insertId)
  })
}

exports.deletePost = (req, res, next) => {
  const post = req.params.id

  conn.query('DELETE FROM post WHERE idPost=?', post, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(results.affectedRows)
  })
}

exports.deleteComment = (req, res, next) => {
  const comment = req.params.id

  conn.query('DELETE FROM comment WHERE idComment=?', comment, function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(results.affectedRows)
  })
}



exports.getAllPost = (req, res, next) => {

  conn.query('SELECT post.users_idUser, post.picture, post.idPost, post.message, post.createdPost, users.username FROM users,post WHERE post.users_idUser=users.idUser ORDER BY post.createdPost DESC', function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({
      results
    })
  })
}
exports.getAllComment = (req, res, next) => {

  conn.query('SELECT comment.idComment, comment.users_idUser, comment.post_idPost, comment.text, users.username FROM comment,post,users WHERE post.idPost=comment.post_idPost && comment.users_idUser=users.idUser', function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({
      results
    })
  })
}


