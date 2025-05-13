const API_URL = `http://localhost:8080`;
let videos = []; // Store all fetched videos
let currentVideoIndex = 0;
const userId = localStorage.getItem('userId');
// const userId = 55;

function fetchFavorites() {
  fetch(`${API_URL}/video/favorites/${userId}`)
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




export function showDataDetail(data) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.

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
    const mainVideo = document.getElementById('mainVideo');
    const mainSource = document.getElementById('mainSource');
    const mainTitle = document.getElementById('mainTitle');
    const mainTags = document.getElementById('mainTags')
    // const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');



    console.log({ userId, username })

    mainSource.src = video.url;
    mainVideo.load();
    mainVideo.play();
    mainTitle.textContent = video.videoName || "Untitled";
    mainTags.textContent = `Tags: ${
      video.query
        .trim()
        .split(/\s+/) // handles multiple spaces
        .map(tag => `#${tag}`)
        .join(" ")
    }`;

  }

  function changeVideo(index) {
    currentVideoIndex = index;
    setMainVideo(videos[index])

  }

  window.changeVideo = changeVideo;

}
//calling the fetch method
fetchFavorites();