const COMMENT_API = "http://localhost:8080/comments";

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  // Submit comment
  document.getElementById("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = document.getElementById("commentText").value.trim();
    const username = localStorage.getItem("username");
    const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;
    console.log(videoId)

    if (!text || !username || !videoId) return;

    const comment = { text, username, videoId };

    try {
      const res = await fetch(COMMENT_API/videoId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
      });

      if (res.ok) {
        const saved = await res.json();
        appendComment(saved);
        commentForm.reset();
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  });

  // Load comments on toggle
  document.getElementById("toggleCommentsBtn").addEventListener("click", () => {
    const videoId = document.getElementById("mainVideoWrapper").dataset.videoId;
    if (videoId) loadComments(videoId);
  });

  function appendComment(comment) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${comment.username}</strong>: ${comment.text}`;
    commentList.appendChild(li);
  }

  async function loadComments(videoId) {
    try {
      const res = await fetch(`${COMMENT_API}/video/${videoId}`);
      const comments = await res.json();

      commentList.innerHTML = "";
      comments.forEach(appendComment);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  }
});
