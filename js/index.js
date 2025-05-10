//pullin videos to start from 


// const apiKey = window.env.YOUTUBE_KEY;
// const query = 'coding tutorials';
// const maxResults  = 20;

// fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`)
//     .then(response => {
//         if (!response.ok){
//             throw new Error(`HTTP error! Status : ${response.status}` )
//         }
//         response.json();
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => {
//         console.error("Error fetching data from YouTube API:", error)
//     })


  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(window.env.YOUTUBE_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "q": "fire"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });

  
