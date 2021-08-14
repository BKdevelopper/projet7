import React, { useState } from "react";

const Comment = (props) => {
  const [commentaire, setCommentaire] = useState("");
  const handleComment = (e) => {
    e.preventDefault();
    props.onComment(commentaire);
  };

  return (
    <form className="formulaire" onSubmit={handleComment}>
      <div className="container-post_commentaire">
        <textarea
          type="text"
          className="container-post_commentaire_text"
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
  );
};

export default Comment;
