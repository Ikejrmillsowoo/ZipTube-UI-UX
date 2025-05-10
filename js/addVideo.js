const API_URL = "http://localhost:8080";
  const form = document.getElementById("uploadForm");
  const successMsg = document.getElementById("successMessage");
  const errorMsg = document.getElementById("errorMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = localStorage.getItem("username");
    if (!username) {
      alert("User not logged in.");
      return;
    }

    //Uploading video file

    const video = {
      videoName: document.getElementById("videoName").value.trim(),
      query: document.getElementById("query").value.trim(),
      url: document.getElementById("url").value.trim(),
      // url: videoUrl,
      year: document.getElementById("year").value.trim(),
      favorite: document.getElementById("favorite").checked,
      uploaded: true,
      username: username
    };

    fetch(`${API_URL}/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(video)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      return res.json();
    })
    .then(data => {
      console.log("Uploaded:", data);
      successMsg.classList.remove("d-none");
      errorMsg.classList.add("d-none");
      form.reset();
    })
    .catch(err => {
      console.error("Error uploading video:", err);
      successMsg.classList.add("d-none");
      errorMsg.classList.remove("d-none");
    });
  });