import axios from "axios";
import { getItem } from "./LocalStorage";
export async function createPost(formData) {
  try {
    const { data } = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/api/post`,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getItem("jwt")}`,
      },
      data: formData,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createComment(text, post_idPost, users_idUser) {
  try {
    const { data } = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/api/post/createComment`,
      withCredentials: true,
      data: {
        text,
        post_idPost,
        users_idUser,
      },
      headers: {
        Authorization: `Bearer ${getItem("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deletePost(idPost) {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/post/deletePost/${idPost}`,
      {
        headers: {
          Authorization: `Bearer ${getItem("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteComment(idComment) {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/post/deleteComment/${idComment}`,
      {
        headers: {
          Authorization: `Bearer ${getItem("jwt")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
