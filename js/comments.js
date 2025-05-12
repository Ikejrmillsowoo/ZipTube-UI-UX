const COMMENT_API = "http://localhost:8080/comments/all";
const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;

document.addEventListener("DOMContentLoaded", function () {

function fetchComments() {
  fetch(`${COMMENT_API}`)
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
    //document.getElementById('posts') = 'error loading comments';
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

fetchComments();
})
// document.addEventListener("DOMContentLoaded", () => {
//   const commentForm = document.getElementById("commentForm");
//   const commentList = document.getElementById("commentList");
//   const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;

//   // Submit comment
//   document.getElementById("commentForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const text = document.getElementById("commentText").value.trim();
//     const userId = localStorage.getItem("userId");
//     //const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;
//     console.log(videoId)

//     if (!text || !userId || !videoId) return;

//     const comment = { text, userId, videoId };

//     try {
//       const res = await fetch(COMMENT_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(comment)
//       });

//       if (res.ok) {
//         const saved = await res.json();
//         appendComment(saved);
//         commentForm.reset();
//       }
//     } catch (err) {
//       console.error("Failed to post comment:", err);
//     }
//   });

//   // Load comments on toggle
//   document.getElementById("toggleCommentsBtn").addEventListener("click", () => {
//     //const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;
//     if (videoId) loadComments(videoId);
//   });

//   function appendComment(comment) {
//     const li = document.createElement("li");
//     li.className = "list-group-item";
//     li.innerHTML = `<strong>${comment.userId}</strong>: ${comment.text}`;
//     commentList.appendChild(li);
//   }

//   async function loadComments(videoId) {
//     try {
//       const res = await fetch(`${COMMENT_API}/video/${videoId}`);
//       const comments = await res.json();

//       commentList.innerHTML = "";
//       comments.forEach(appendComment);
//     } catch (err) {
//       console.error("Failed to load comments:", err);
//     }
//   }
// });
