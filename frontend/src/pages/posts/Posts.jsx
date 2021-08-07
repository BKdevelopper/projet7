import React, { useContext, useEffect, useState } from "react";
import { createComment, createPost, deletePost } from "../../services/PostApi";
// import Auth from "../../context/Auth";
import { UidContext } from "../../context/UserID";
import axios from "axios";
import "./style/Posts.scss";
import { dateParser, refreshPage } from "../../services/Utils";
const Posts = (props) => {
  const uid = useContext(UidContext);
  const [message, setMessage] = useState("");
  const [idPost, setIdPost] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState([]);
  
  const [file, setFile] = useState([]);

  //console.log(file)
  const handleDeletePost = (idPosts) => {
    deletePost(idPosts);
    refreshPage()
  };
  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("uid", uid);
    formData.append("message", message);
    createPost(formData);
    refreshPage()
  };

  const handleComment = (e) => {
    e.preventDefault();
    createComment(commentaire, idPost, uid);
  };
  useEffect(() => {
    async function fetchData() {
      const reqPost = await axios.get(
        "http://localhost:3000/api/post/getAllPost"
      );
      setPeople(reqPost.data.results);

      const reqComment = await axios.get(
        "http://localhost:3000/api/post/getAllComment"
      );
      setComment(reqComment.data.results);
    }

    fetchData();
  }, []);

  return (
    <div className="container-postMSG">
      <div className="container-postMSG_logo">
        <img
          className="container-postMSG_logo_img"
          src="./img/logo.png"
          alt="icon"
        />
      </div>

      <form className="formulaire" onSubmit={handlePost}>
        <div className="container-postMSG_form">
          <div className="container-postMSG_form_message">
            <label
              htmlFor="message"
              className="container-postMSG_form_message_texte"
            ></label>
            <textarea
              type="text"
              className="container-postMSG_form_message_input"
              id="message"
              placeholder="Votre message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="container-postMSG_form_btn">
            <label for="file" className="container-postMSG_form_btn_label">
              Choisir une image
            </label>
            <input
              type="file"
              className="container-postMSG_form_btn_parcourir"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="submit"
              className="container-postMSG_form_btn_poster"
              value="Poster"
            />
          </div>
        </div>
      </form>

      {people.map((person) => (
        <div className="container-post">
          {}
          <div className="container-post_top">
            <div className="container-post_top_username">{person.username}</div>
            <div className="container-post_top_date">
              {dateParser(person.createdPost)}
            </div>
          </div>
         
          <div className="container-post_message">{person.message}</div>
          {person.picture ==="" ? (null):(
          <div className="container-post_img">
             <img
              src={person.picture}
              className="container-post_img_cadre"
              alt="img"
            />
            </div>)}
           
          
          <div className="container-post_icon">
            {uid === person.users_idUser ? (
              <i
                class="far fa-trash-alt container-post_icon_delete"
                onClick={(e) => handleDeletePost(person.idPost)}
              ></i>
            ) : null}
          </div>
          <form className="formulaire" onSubmit={handleComment}>
            <div
              className="container-post_commentaire"
              onChange={(e) => setIdPost(person.idPost)}
            >
              <textarea
                type="text"
                className="container-post_commentaire_text"
                id={person.idPost}
                placeholder="Votre message"
                onChange={(e) => setCommentaire(e.target.value)}
                value={commentaire}
              />
              <input
                type="submit"
                className="container-post_commentaire_btn"
                value="Envoyer"
              />
            </div>
          </form>
          <div className="container-post_comment">
            {comment.map((personComment) =>
              personComment.post_idPost === person.idPost ? (
                <div className="container-post_comment_post">
                  <div className="container-post_comment_post_username">
                    {personComment.username}
                  </div>
                  <div className="container-post_comment_post_texte">
                    {personComment.text}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
