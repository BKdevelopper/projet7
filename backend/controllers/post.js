const conn = require('../utils/db')
const fs = require('fs');
exports.createPost = (req, res, next) => {
  //console.log(req.file)
    const msg = req.body.message
    const user = req.body.uid
    const picture =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//req.files[0].originalname
    var post={
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
      return res.status(201).json('Votre post à bien été crée')
    })
  }

  exports.createComment = (req, res, next) => {
    const text = req.body.text
    const user = req.body.users_idUser
    const post = req.body.post_idPost
    var comment={
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
      return res.status(201).json('Votre commentaire à bien été crée')
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
      return res.status(201).json('Le post à bien été supprimer')
    })
  }
  exports.createLike = (req, res, next) => {
    const like = req.body.likes
    const user = req.body.users_idUser
    const post = req.body.post_idPost
    var likePost={
        "likes": like,
        "users_idUser": user,
        "post_idPost": post
    }
    
    conn.query('INSERT INTO likes SET ?', likePost, function (
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(201).json('Votre like à bien été crée')
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
      return res.status(201).json({ results })
    })
  }
  exports.getAllComment = (req, res, next) => {   
    
    conn.query('SELECT comment.idComment, comment.post_idPost, comment.text, users.username FROM comment,post,users WHERE post.idPost=comment.post_idPost && comment.users_idUser=users.idUser', function (
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(201).json({ results })
    })
  }

  exports.getPostByID = (req, res, next) => {   
    
    conn.query('SELECT post.message, users.username FROM users,post WHERE post.users_idUser && users.idUser =?', req.body.users_idUser,function (
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(201).json({ results })
    })
  }

  exports.updatePost = (req, res, next) => {
    conn.query(
      'SELECT * FROM post WHERE idPost=?',
      req.params.id,
      function (error, results, fields) {
        if (error) {
          return res.status(400).json(error)
        }        
        const msg = req.body.message
        const user = req.body.users_idUser
        var post={
            "message": msg,  
            "users_idUser": user          
        }
        conn.query('UPDATE post SET ? WHERE idPost=?',
          [post, req.params.id],
          function (error, results, fields) {
            if (error) {
              return res.status(400).json(error)
            }
            return res.status(200).json('Votre message a bien été modifié')
          }
        )
      }
    )
  }