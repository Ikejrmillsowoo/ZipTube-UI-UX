 import { showDataDetail } from "./fetch.js";

document.addEventListener('DOMContentLoaded', function () {
const API_URL = `http://localhost:8080`;


document.getElementById('searchButton').addEventListener('click', function () {
        const query = document.getElementById('searchInput').value;
    
        if (query) {
          // Example: Log the query or send it to an API
          console.log('Searching for:', query);
    
          // Example: Fetch results from an API
          fetch(`${API_URL}/video/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
              console.log('Search results:', data);
              showDataDetail(data)
              // Display results on the page (you can customize this)
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
