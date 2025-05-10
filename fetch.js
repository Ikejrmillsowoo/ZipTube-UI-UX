const API_URL = `http://localhost:8080`;
let videos = []; // Store all fetched videos
let currentVideoIndex = 0;
let currentVideoId = 0
console.log(currentVideoId)


function fetchData() {
  fetch(`${API_URL}/video`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      videos = data;
      showDataDetail(videos);

      console.log(data)
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      console.error("CORS error?", error)
      document.getElementById('posts').innerHTML = 'Error Loading Items Data';
    });
}

function showLocationName(data) {
  const heading = document.getElementById('heading')

  heading.innerHTML = data.name;
}

const wrapper = document.getElementById("mainVideoWrapper")
wrapper.dataset.videoId = currentVideoId;


export function showDataDetail(data) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  // const ul = document.getElementById('location');
  // const detail = document.createDocumentFragment();

  const thumbnailRow = document.getElementById('thumbnailRow');

  if (data.length > 0) {
    setMainVideo(data[0])
  }

  console.log('Data:', data);
  data.forEach((video, index) => {
    console.log('Item:', video);

    //create a card div
    const col = document.createElement('div')
    col.className = 'col-6 col-sm-4 col-md-3 mb-3'
    col.innerHTML = `<video src="${video.url}" class="img-fluid video-thumb" muted onclick="changeVideo(${index})"></video>
`; //can change this it optional
    thumbnailRow.appendChild(col);
  });
  function setMainVideo(video) {
    currentVideoId = video.videoId;
    const mainVideo = document.getElementById('mainVideo');
    const mainSource = document.getElementById('mainSource');
    const mainTitle = document.getElementById('mainTitle');
    const likeBtn = document.getElementById('likeBtn');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');



    console.log({ userId, username })

    mainSource.src = video.url;
    mainVideo.load();
    mainVideo.play();
    mainTitle.textContent = video.videoName || "Untitled";

    if (video.favorite) {
      likeBtn.classList.remove('btn-outline-primary');
      likeBtn.classList.add('btn-primary');
      likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> Liked';
    } else {
      likeBtn.classList.remove('btn-primary');
      likeBtn.classList.add('btn-outline-primary');
      likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Like';
    }

    // Rebind like button
    likeBtn.onclick = () => {
      let liked = likeBtn.classList.contains('btn-primary');
      const newState = !liked;

      if (newState) {
        likeBtn.classList.remove('btn-outline-primary');
        likeBtn.classList.add('btn-primary');
        likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> Liked';
      } else {
        likeBtn.classList.remove('btn-primary');
        likeBtn.classList.add('btn-outline-primary');
        likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Like';
      }

      fetch(`${API_URL}/video/${currentVideoId}/toggle-favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
        .then(res => res.json())
        .then(data => console.log('Favorite updated:', data))
        .catch(err => {
          console.error('Failed to update like:', err);
          alert("Error updating like status.");
        });
    };

  }

  function changeVideo(index) {
    currentVideoIndex = index;
    setMainVideo(videos[index])

  }

  window.changeVideo = changeVideo;

}
//calling the fetch method
fetchData();


// document.addEventListener('DOMContentLoaded', function () {
//   const likeBtn = document.getElementById('likeBtn');
//   const videoId = currentVideoId; // replace with dynamic video ID
//   const userId = localStorage.getItem('userId'); // assumes user is logged in
//   let liked = false;
//   likeBtn.addEventListener('click', function () {
//     liked = !liked;

//     // UI Update
//     if (liked) {
//       likeBtn.classList.remove('btn-outline-primary');
//       likeBtn.classList.add('btn-primary');
//       likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i> Liked';
//     } else {
//       likeBtn.classList.remove('btn-primary');
//       likeBtn.classList.add('btn-outline-primary');
//       likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i> Like';
//     }

//     // 🔥 Fetch call to toggle favorite/like
//     fetch(`${API_URL}/video/${videoId}/toggle-favorite`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userId) // assuming your backend just expects userId
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log('Server response:', data);
//     })
//     .catch(error => {
//       console.error('Like update failed:', error);
//       alert("Couldn't update like status.");
//     });
//   });
// });


