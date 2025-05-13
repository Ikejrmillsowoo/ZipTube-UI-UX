import { showDataDetail } from "./fetch.js";

document.addEventListener('DOMContentLoaded', function () {
  const API_URL = `http://localhost:8080`;
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
          showDataDetail(data)

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
