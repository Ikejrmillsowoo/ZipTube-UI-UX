const API_URL = `http://localhost:8080`;
let videos = []; // Store all fetched videos
let currentVideoIndex = 0;



function fetchVideoData() {
    fetch(`${API_URL}/videos`)
        .then(res => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then(data => {
          videos = data;
          showVideoDetail(videos);
              
            console.log(data)
        })
        .catch(error => {
            console.log(`Error Fetching data : ${error}`);
            console.error("CORS error?", error)
            document.getElementById('posts').innerHTML = 'Error Loading Items Data';
        });
}

document.addEventListener("DOMContentLoaded", () => {

const searchBtn = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

  if (!searchBtn || !searchInput) {
    console.warn("Search bar not found on this page. Skipping search script.");
    return;
  }


 searchBtn.addEventListener('click', function () {
  document.querySelector("form.d-flex").addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload
    searchBtn.click(); // reuse button logic
  });
  const query = searchInput.value;
  console.log("clicked")
  if (query) {
    // Example: Log the query or send it to an API
    console.log('Searching for:', query);

    // Example: Fetch results from an API
    fetch(`${API_URL}/video/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        console.log('Search results:', data);
        showVideoDetail(data)
        // Display results on the page (you can customize this)
        searchInput.value = '';
      })
      .catch(error => {
        console.error('Error fetching search results:', error)
        console.error("CORS error?", error)
        document.getElementById('posts').innerHTML = 'Error Loading Items Data';
      });

  } else {
    alert('Please enter a search term.');
  }
});


})




export function showVideoDetail(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    // const ul = document.getElementById('location');
    // const detail = document.createDocumentFragment();
    
    const thumbnailRow = document.getElementById('thumbnailRow');

    if (data.length > 0){
      setMainVideo(data[0])
    }
  
  console.log('Data:', data);
  data.forEach((video, index)=> {
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
  const mainTags = document.getElementById('mainTags')
  const mainTitle = document.getElementById('mainTitle');


  mainSource.src = video.url;
  mainVideo.load();
  mainVideo.play();
  mainTitle.textContent = video.videoName || "Untitled";
  // mainTags.textContent = `Tags: ${video.query}`;
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
fetchVideoData();


