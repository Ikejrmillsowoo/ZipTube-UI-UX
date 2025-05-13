const COMMENT_API = "http://localhost:8080/comments";

export function fetchComments(videoId) {
  fetch(`${COMMENT_API}/video/${videoId}`, {
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
    
    username.innerHTML = `${comment.username}`;
    text.innerHTML = `${comment.text}`;

    li.appendChild(username);
    li.appendChild(text);

    list.appendChild(li);
  })
  ul.appendChild(list);
}

export function clearComments(videoId) {
  const ul = document.getElementById('commentList');
  ul.innerHTML = "";
}

fetchComments();

