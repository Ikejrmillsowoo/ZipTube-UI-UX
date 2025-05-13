import { currentVideoId } from "./fetch.js";
const COMMENT_API = "http://localhost:8080/comments";
document.addEventListener("DOMContentLoaded", function () {
  
function fetchComments() {
  fetch(`${COMMENT_API}`, {
    method: "GET"
  })
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(`comment ${data}`);
    showComments(data);
  })
  .catch(error => {
    console.log(`Error fetching: ${error}`);
    console.error("CORS err", error);
  })
}

function showComments(data) {
  const ul = document.getElementById('commentList');
  const list = document.createDocumentFragment();

  data.map(function (comment) {
    let li = document.createElement('li');
    let username = document.createElement('p');
    let text = document.createElement('p');
    
    if (comment.videoId === currentVideoId) {  
      username.innerHTML = `${comment.username}`;
      text.innerHTML = `${comment.text}`;

      li.appendChild(username);
      li.appendChild(text);
    }

    list.appendChild(li);
  
  })
  ul.appendChild(list);
  
}

fetchComments();
})
