// const API_URL = "http://localhost:comments/";
// const commentForm = document.getElementById("commentForm");

// commentForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const username = localStorage.getItem("username");
//     const userId = localStorage.getItem("userId");
//     const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;
//     const text = document.getElementById("commentText").value.trim();

//     //console.log(videoId);

//     if (!username || !userId || !videoId || !text) {
//         alert("Missing one or more fields")
//         return;
//     }
    
//     const comment = {text, userId, username, videoId};

//     fetch(API_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(comment)
//     })
//     .then(res => {
//         if (!res.ok) {
//             throw new Error("Comment failed to post");
//         }
//         return res.json();
//     })
//     .then(data => {
//         console.log("Comment posted:", data);
//         commentForm.reset();
//     })
//     .catch(err => {
//         console.error("Comment error:", err);
//     });
// });