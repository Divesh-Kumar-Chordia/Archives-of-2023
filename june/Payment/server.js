const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json());

// Login route
app.post('/login', function(req, res) {
  // Authenticate user and handle login logic
  // Example: Check credentials against database records

  // Simulate successful login
  const email = req.body.email;
  if (email === 'user@example.com') {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Payment interface route
app.get('/payment', function(req, res) {
  res.sendFile(__dirname + '/payment.html');
});

// Start the server
const port = 3000;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});
