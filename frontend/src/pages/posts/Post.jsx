import React from "react";

const Post = (props) => {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Post name</h1>
      <p className="lead">Created At : ... | Created By : ...</p>
      <hr className="my-4" />
      <p>Post Content</p>
    </div>
  );
};

export default Post;
