import axios from "axios"

//import jwtDecode from "jwt-decode"
export function createPost(formData){
    return axios({
        method: "post",
        url: 'http://localhost:3000/api/post',      
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
    .then((res) => {        
        return true
    }) 
    .catch((err) => console.log(err));
}

export function createComment(text,post_idPost,users_idUser){
  return axios({
      method: "post",
      url: 'http://localhost:3000/api/post/createComment',      
      withCredentials: true,
      data: {
        text,
        post_idPost,
        users_idUser,
      },
    })
  .then((res) => {        
      return true
  }) 
  .catch((err) => console.log(err));
}
export function deletePost(idPost) {
  return axios.delete(`http://localhost:3000/api/post/deletePost/${idPost}`).then(() => true);
 }
// export function deletePost(idPost){
//   return axios({
//       method: "delete",
//       url: 'http://localhost:3000/api/post/deletePost',      
//       withCredentials: true,
//       data: idPost,
//     })
//   .then((res) => {        
//       return true
//   }) 
//   .catch((err) => console.log(err));
// }





// export function allpost(){
//   //let list = {};
//   let items;
//     return axios({
//          method: "get",
//          url: 'http://localhost:3000/api/post/getAllPost',      
//          withCredentials: true,         
//        })
//        .then(async res => {  //Récupère le tableau json 
//         const result = await res.data //Donne un nom au tableau json récupéré
//         items = result //Result deviens items
//         //Appel de nos functions
//         let infoProduit = {        
//             username: items.username,
//             message: items.message
//         };
//         return infoProduit        
//     })
//     //  .then(response => {
//     //   let state = []
//     //   const res = this.setState({state: response.data });
//     //   return res
//     // })
       
//         //  const username = res.data.username;
//         //  const message = res.data.message;
//         //  let post =[ {
//         //      username,
//         //      message
//         //  }]
//         //composantDidMount () axios.get ('https://randomuser.me/api/?results=10&inc=name,enregistré&nat=fr') 
//        // .then (json => json.data.results.map (result => ( nom: '$ result.name.first $ result.name.last', id: result.registered)) 
//         //.then (newData => console.log (newData))
//          //return res.data.results.map (result => ( username: results.username, message: results.message))
      
//      .catch((err) => console.log(err));          
//  }
//  let items;
// export function poste(){
  
//   fetch(`http://localhost:3000/api/post/getAllPost`) //Rappel notre api + l'id de notre produit
//     .then(async res => {  //Récupère le tableau json 
//         const result = await res.json() //Donne un nom au tableau json récupéré
//         items = result //Result deviens items
//         //Appel de nos functions
//       //   let infoProduit = {        
//       //     username: items.username,
//       //     message: items.message
//       // };
//         return items 
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// }
/*export function usernamePost(){
    const post = allpost()
    const id = post.id;
    return axios({
        method: "get",
        url: `http://localhost:3000/api/post/getUsernameByID/${id}`,      
        withCredentials: true,         
      })
    .then((res) => {
        const name = res.data.username;
        
        return name
    }) 
    .catch((err) => console.log(err));
}*/