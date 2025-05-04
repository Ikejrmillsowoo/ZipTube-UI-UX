//pullin videos to start from 

require('dotenv').config();

const apiKey = process.env.YOUTUBE_KEY;
const query = 'coding tutorials';
const maxResults  = 20;

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`)
    .then(response => {
        if (!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}` )
        }
        responseresponse.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error("Error fetching data from YouTube API:", error)
    })