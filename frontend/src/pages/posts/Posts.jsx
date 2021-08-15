import React, { useContext, useEffect, useState } from "react";
import {
  createComment,
  createPost,
  deletePost,
  deleteComment,
} from "../../services/PostApi";
import { UidContext } from "../../context/UserID";
import axios from "axios";
import "./style/Posts.scss";
import { dateParser } from "../../services/Utils";
import Comment from "../../components/Comment";
import {
  ErreurChampObligatoire,
  ErreurChampObligatoireComment,
} from "../../services/Erreur";
import { getItem } from "../../services/LocalStorage";
const Posts = (props) => {
  const uid = useContext(UidContext);
  const [message, setMessage] = useState("");  
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState([]);
  const [file, setFile] = useState("");
  const [user, setUser] = useState([]);


  const handleComment = async (idPost, commentaire) => {
   
    if (commentaire && user[0]) {
      const idcomment = await createComment(commentaire, idPost, uid);
      setComment((prevComment) => [
        {
          idComment: idcomment,
          post_idPost: idPost,
          text: commentaire,
          username: `${user[0].username}`,
          users_idUser: uid,
        },
        ...prevComment,
      ]);
    } else {
      ErreurChampObligatoireComment();
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (message && user[0]) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("uid", uid);
      formData.append("message", message);
      const idPost = await createPost(formData);
      setPeople((prevPeople) => [
        {
          createdPost: new Date(),
          idPost,
          message,
          picture: file
            ? `${process.env.REACT_APP_URL}/images/` +
              file.name +
              parseInt(Date.now() / 1000000) +
              "." +
              file.name.split(".").pop()
            : "",
          username: `${user[0].username}`,
        },
        ...prevPeople,
      ]);
    } else {
      ErreurChampObligatoire();
    }
  };

  const handleDeleteComment = async (idComments) => {
    await deleteComment(idComments);
    if (comment.length > 0) {
      let updatedRows = [...comment];

      let indexToRemove = updatedRows.findIndex(
        (x) => x.idComment === idComments
      );

      if (indexToRemove > -1) {
        updatedRows.splice(indexToRemove, 1);
        setComment(updatedRows);
      }
    }
  };
  const handleDeletePost = async (idPosts) => {
    await deletePost(idPosts);
    if (people.length > 0) {
      let updatedRows = [...people];

      let indexToRemove = updatedRows.findIndex((x) => x.idPost === idPosts);

      if (indexToRemove > -1) {
        updatedRows.splice(indexToRemove, 1);
        setPeople(updatedRows);
      }
    }
  };

  useEffect(() => {
   
   if(uid){
    async function fetchData() {
      const reqUser = await axios.get(
        `${process.env.REACT_APP_URL}/api/auth/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${getItem("jwt")}`,
          },
        }
      );
      
      setUser(reqUser.data.results);
      const reqPost = await axios.get(
        `${process.env.REACT_APP_URL}/api/post/getAllPost`,
        {
          headers: {
            Authorization: `Bearer ${getItem("jwt")}`,
          },
        }
      );
      setPeople(reqPost.data.results);

      const reqComment = await axios.get(
        `${process.env.REACT_APP_URL}/api/post/getAllComment`,
        {
          headers: {
            Authorization: `Bearer ${getItem("jwt")}`,
          },
        }
      );
      setComment(reqComment.data.results);
      
      
    }
    fetchData();
   }
    
    
  }, [uid]);

 
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
            <label htmlFor="file" className="container-postMSG_form_btn_label">
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
          <div id="Erreur-Form" ></div>
        </div>
      </form>
    
      {people.map((person) => (
        <div className="container-post" key={person.idPost}>
          <div className="container-post_top">
            <div className="container-post_top_username">{person.username}</div>
            <div className="container-post_top_date">
              {dateParser(person.createdPost)}
            </div>
          </div>

          <div className="container-post_message">{person.message}</div>
          {person.picture === "" ? null : (
            <div className="container-post_img">
              <img
                src={person.picture}
                className="container-post_img_cadre"
                alt="img"
              />
            </div>
          )}

          <div className="container-post_icon">
          {user.map((personAdmin) => 
              uid === person.users_idUser ||
              (uid === personAdmin.idUser && personAdmin.isAdmin === 1) ? (
                <i
                  className="far fa-trash-alt container-post_icon_delete"
                  key={person.idPost}
                  onClick={(e) => handleDeletePost(person.idPost)}
                ></i>
              ) : null
              )}
          </div>
          <Comment onComment={commentaire => handleComment(person.idPost, commentaire)}/>
          <div className="container-post_comment">
            {comment.map((personComment) =>
              personComment.post_idPost === person.idPost ? (
                <div
                  className="container-post_comment_post"
                 key={personComment.idComment}
                >
                  <div className="container-post_comment_post_username">
                    {personComment.username}
                  </div>
                  <div className="container-post_comment_post_texte">
                    {personComment.text}
                  </div>
                  {user.map((personAdmin) =>
                    uid === personComment.users_idUser ||
                    (uid === personAdmin.idUser &&
                      personAdmin.isAdmin === 1) ? (
                      <i
                        className="far fa-trash-alt container-post_icon_delete pos"
                        key={personComment.idComment}
                        onClick={(e) =>
                          handleDeleteComment(personComment.idComment)
                        }
                      ></i>
                    ) : null
                  )}
                </div>
              ) : null
            )}
            <div id="Erreur-Com"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
