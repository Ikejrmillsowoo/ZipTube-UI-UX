document.getElementById('logoutBtn').addEventListener('click', function () {
    // Clear stored login info
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  
  
    // Redirect to login page
    window.location.href = 'login.html';
  });
  