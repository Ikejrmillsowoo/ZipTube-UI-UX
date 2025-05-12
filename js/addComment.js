const COMMENTS_API = "http://localhost:8080/comments/add";
const commentForm = document.getElementById("commentForm");

document.addEventListener("DOMContentLoaded", function () {

commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const wrapper = document.getElementById("mainVideoWrapper");
    const currentVideoId = wrapper.dataset.videoId;
    //const currentVideoId = document.getElementById("mainVideoWrapper").dataset.videoId;
    const text = document.getElementById("commentText").value.trim();

    console.log(username, userId, text, currentVideoId);

    if (!username) {
        alert("Must be logged in to add comments");
        return;
    }
    
    const comment = {
        text: text,
        userId: userId,
        username: username,
        videoId: currentVideoId
    };

    fetch(`${COMMENTS_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Comment failed to post");
        }
        return res.json();
    })
    .then(data => {
        console.log("Comment posted:", data);
        commentForm.reset();
    })
    .catch(err => {
        console.error("Comment error:", err);
        //alert("Comment failed to post");
    });
});
})