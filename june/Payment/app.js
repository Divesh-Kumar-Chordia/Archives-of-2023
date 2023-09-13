// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
  
    // Get user input
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Perform login AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Redirect to payment interface
          window.location.href = '/payment';
        } else {
          alert(response.message);
        }
      } else {
        alert('Error: ' + xhr.status);
      }
    };
    xhr.send(JSON.stringify({ email: email, password: password }));
  });
  