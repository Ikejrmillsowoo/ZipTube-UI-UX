import { currentVideoId } from "./fetch.js";
const COMMENTS_API = "http://localhost:8080/comments/add";

document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("commentForm");
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        let wrapper = document.getElementById("mainVideoWrapper");
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
        });
    });
})