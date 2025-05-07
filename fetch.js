const API_URL = `http://localhost:8080`;


function fetchData() {
    fetch(`${API_URL}/video`)
        .then(res => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then(data => {
              showDataDetail(data);
            console.log(data)
        })
        .catch(error => {
            console.log(`Error Fetching data : ${error}`);
            console.error("CORS error?", error)
            document.getElementById('posts').innerHTML = 'Error Loading Items Data';
        });
}

function showLocationName(data){
    const heading = document.getElementById('heading')

    heading.innerHTML = data.name;
}


function showDataDetail(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    // const ul = document.getElementById('location');
    // const detail = document.createDocumentFragment();
    const container = document.getElementById('container');
    const mainVideo = document.getElementById('mainVideo');
    const thumbnailRow = document.getElementById('thumbnailRow');
    // const commentList = document.getElementById('commentList');
    // const commentForm = document.getElementById('commentForm');
    // const commentInput = document.getElementById('commentInput');

  
  console.log('Data:', data);

  data.map(function (video) {
    console.log('Item:', video);
  
    //create a card div
    const col = document.createElement('div')
    col.className = 'col-6 col-sm-4 col-md-3 mb-3'
    col.innerHTML = `<video src="${video.url}" class="img-fluid video-thumb" muted onclick="changeVideo(${videoId})"></video>
`; //can change this it optional
    thumbnailRow.appendChild(col);
  });
    function changeVideo(videoId) {
        currentVideoIndex = videoId;
        mainVideo.src = videos[videoId].src;
        mainVideo.play();
       //renderComments();
      }
    //   commentForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const comment = commentInput.value.trim();
    //     if (comment) {
    //       videos[currentVideoIndex].comments.push(comment);
    //       commentInput.value = '';
    //       renderComments();
    //     }
    //   });

    // Create image
//     const img = document.createElement('img');
//     img.className = 'card-img-top';
//     img.src = item.imageUrl;
//     img.alt = item.type;
    
//    // Create card body
//   const cardBody = document.createElement('div');
//   cardBody.className = 'card-body';
  
//   // Title with link
//   const title = document.createElement('h5');
//   title.className = 'card-title';
//   title.innerHTML = `<a href="./itemDetail.html?id=${item.id}" class="text-decoration-none">${item.type}</a>`;

//   // Model text
//   const model = document.createElement('p');
//   model.className = 'card-text';
//   model.innerText = `Model: ${item.model}`;
  
//   // Barcode text
//   const barCode = document.createElement('p');
//   barCode.className = 'card-text';
//   barCode.innerText = `Barcode: ${item.barCodeNumber}`;
  
//   // Location text
//   const location = document.createElement('p');
//   location.className = 'card-text';
//   location.innerText = `Location ID: ${item.locationId}`;

//    // add to cart
//    const addToCart = document.createElement('p');
//    location.className = 'btn btn-success add-to-cart';
//    location.innerText = `Add To Cart`;

//   // Put everything together
//   cardBody.appendChild(title);
//   cardBody.appendChild(model);
//   cardBody.appendChild(barCode);
//   cardBody.appendChild(location);
//   cardBody.appendChild(addToCart);
//   card.appendChild(img);
//   card.appendChild(cardBody);
  
//   // Add card to container
//   container.appendChild(card);
  
   
//   });
// }

fetchData();
}

// const videos = [
//     { src: 'video1.mp4', comments: ['Great intro!', 'Nice editing.'] },
//     { src: 'video2.mp4', comments: ['Loved this!', 'More content like this please.'] },
//     { src: 'video3.mp4', comments: ['Could use better audio.', 'Cool visuals.'] },
//     { src: 'video4.mp4', comments: ['Very informative.', 'Thanks for sharing!'] },
//   ];

//   const mainVideo = document.getElementById('mainVideo');
//   const thumbnailRow = document.getElementById('thumbnailRow');
//   const commentList = document.getElementById('commentList');
//   const commentForm = document.getElementById('commentForm');
//   const commentInput = document.getElementById('commentInput');

//   let currentVideoIndex = 0;

//   // Display thumbnails
//   videos.forEach((video, index) => {
//     const col = document.createElement('div');
//     col.className = 'col-6 col-sm-4 col-md-3 mb-3';
//     col.innerHTML = `
//       <video src="${video.src}" class="img-fluid video-thumb" muted onclick="changeVideo(${index})"></video>
//     `;
//     thumbnailRow.appendChild(col);
//   });

//   function changeVideo(index) {
//     currentVideoIndex = index;
//     mainVideo.src = videos[index].src;
//     mainVideo.play();
//     renderComments();
//   }

//   function renderComments() {
//     commentList.innerHTML = '';
//     videos[currentVideoIndex].comments.forEach(comment => {
//       const li = document.createElement('li');
//       li.className = 'list-group-item';
//       li.textContent = comment;
//       commentList.appendChild(li);
//     });
//   }

//   commentForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const comment = commentInput.value.trim();
//     if (comment) {
//       videos[currentVideoIndex].comments.push(comment);
//       commentInput.value = '';
//       renderComments();
//     }
//   });

//   // Initialize comments for first video
//   renderComments();