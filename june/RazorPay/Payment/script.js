// Global variables
let currentUser = null;

// Dummy data for initial users
const users = [
  { username: "John", password: "password1", phonenumber: "1234567890", accno: "111111111", accountbalance: 500 },
  { username: "Jane", password: "password2", phonenumber: "9876543210", accno: "222222222", accountbalance: 1000 },
  { username: "Alice", password: "password3", phonenumber: "5555555555", accno: "333333333", accountbalance: 2000 }
];

// Functions for login and register
function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Find the user with matching username and password
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    showPaymentPage();
  } else {
    alert("Invalid username or password. Please try again.");
  }
}

function registerUser() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const accountNo = document.getElementById("accountNo").value;
  const newUser = {
    username: username,
    password: password,
    phonenumber: phoneNumber,
    accno: accountNo,
    accountbalance: 0
  };
  users.push(newUser);
  currentUser = newUser;
  showPaymentPage();
}

// Function for showing the payment page
function showPaymentPage() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("paymentPage").style.display = "block";
}

// Function for searching users
function searchUser() {
  const searchInput = document.getElementById("searchInput").value;
  // Find users based on username or phone number
  const searchResults = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.phonenumber.includes(searchInput)
  );
  displaySearchResults(searchResults);
}

// Function for displaying search results
function displaySearchResults(results) {
  const userTileContainer = document.getElementById("userTile");
  userTileContainer.innerHTML = ""; // Clear previous results
  if (results.length > 0) {
    results.forEach((user) => {
      const userTile = document.createElement("div");
      userTile.className = "userTile";
      userTile.textContent = `${user.username} (${user.phonenumber})`;
      userTile.addEventListener("click", () => {
        selectUser(user);
      });
      userTileContainer.appendChild(userTile);
    });
  } else {
    userTileContainer.textContent = "No results found";
  }
}

// Function for selecting a user and displaying user details
function selectUser(user) {
  currentUser = user;
  showUserDetails();
  showPaymentUI();
}

// Function for showing user details
function showUserDetails() {
  document.getElementById("userDetails").style.display = "block";
  document.getElementById("accountNo").textContent = currentUser.accno;
  document.getElementById("username").textContent = currentUser.username;
  document.getElementById("userAccountBalance").textContent = currentUser.accountbalance;
}

// Function for showing the payment UI
function showPaymentUI() {
  document.getElementById("searchBar").style.display = "none";
  document.getElementById("userTile").style.display = "none";
  document.getElementById("paymentUI").style.display = "block";
}

// Function for going back to the home page
function goBack() {
  document.getElementById("searchBar").style.display = "block";
  document.getElementById("userTile").style.display = "block";
  document.getElementById("paymentUI").style.display = "none";
  document.getElementById("userDetails").style.display = "none";
  document.getElementById("searchInput").value = "";
  currentUser = null;
}

// Function for appending numbers to the payment display
function appendNumber(number) {
  const display = document.getElementById("display");
  const currentAmount = parseFloat(display.textContent);
  const newAmount = currentAmount * 10 + number;
  display.textContent = newAmount;
}

// Function for clearing the payment display
function clearDisplay() {
  document.getElementById("display").textContent = "0";
}

// Function for making the payment
function makePayment() {
  const paymentAmount = parseFloat(document.getElementById("display").textContent);
  if (paymentAmount > currentUser.accountbalance) {
    document.getElementById("paymentStatus").textContent = "Payment Failed: Insufficient funds";
  } else {
    document.getElementById("paymentStatus").textContent = "Payment Successful";
    currentUser.accountbalance -= paymentAmount;
    document.getElementById("userAccountBalance").textContent = currentUser.accountbalance;
  }
}
