// Data schema for users
const users = [
    {
      id: 1,
      name: "John Doe",
      number: "1234567890",
      accountBalance: 500
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "9876543210",
      accountBalance: 1000
    },
    // Add more user objects as needed
  ];
  function findIdByNumber(number) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].number === number) {
            return users[i];
        }
    }
    return null; // Return null if the number is not found
}

function findIdByName(name) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            return users[i];
        }
    }
    return null; // Return null if the name is not found
}
  // Search user by name or number
  document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var searchInput = document.getElementById("searchInput").value;
    var user = searchUser(searchInput);
    if (user) {
      displayUserDetails(user);
    } else {
      displayErrorMessage("User not found");
    }
  });
  
  // Helper function to search user by name or number
  function searchUser(searchInput) {
    // Perform search logic here
    if (!isNaN(input)) {
        // Input is a number
        var number = parseInt(input);
                const user = findIdByNumber(number);
    } else {
        // Input is a string
        const user = findIdByName(searchInput);
    }

    
    if(user != null){
        displayUserDetails(user);
    }
    // Return the user object if found, otherwise return null
  }
  
  // Helper function to display user details
  function displayUserDetails(user) {
    // Display the user details here
        const id = user.id;
        const name = user.name;
        const number = user.number;
        const accountBalance = user.accountBalance;
    document.append(<div>
                    <h1> ID : id  </h1>
                    <h1> User Name : name</h1>
                    <h1> Number : number </h1>
                    <h1> Account Balance : accountBalance </h1> 
                    </div>);
  }
  
  // Helper function to display error message
  function displayErrorMessage(message) {
    // Display the error message here
  }
  
  // Handle payment when an ID is clicked
  document.getElementById("paymentContainer").addEventListener("click", function(e) {
    var target = e.target;
    if (target.classList.contains("id")) {
      var id = target.getAttribute("data-id");
      var user = findUserById(id);
      if (user) {
        performPayment(user);
      }
    }
  });
  
  // Helper function to find user by ID
  function findUserById(id) {
    // Perform search logic here
    // Return the user object if found, otherwise return null
  }
  
  // Helper function to perform payment
  function performPayment(user) {
    // Perform payment logic here
    // Check if the user has sufficient balance for the payment
    // If successful, update the user's account balance and show the transaction success interface
    // Otherwise, show the transaction failed interface
  }
  
  // Handle QR code scanning and payment number panel
  document.getElementById("qrCodeScanner").addEventListener("click", function(e) {
    // Perform QR code scanning and payment number panel logic here
  });
  
  // Display transaction success interface
  function showTransactionSuccess() {
    // Display the transaction success interface here
  }
  
  // Display transaction failed interface
  function showTransactionFailed() {
    // Display the transaction failed interface here
  }
  