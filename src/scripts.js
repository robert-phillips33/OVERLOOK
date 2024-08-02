
import './css/styles.css';

const { fetchCustomerData, fetchRoomData, fetchBookingData, postBookingData, 
  customersAPI, roomsAPI, bookingsAPI } = require('../src/apiCalls.js');

const { getCustomerBookings, getAvailableRooms, getSumOfAllBookings, 
  filterRoomsByType } = require('../src/main.js');

// <--------------------> EVENT LISTENERS <--------------------> //
document.addEventListener('DOMContentLoaded', () => {
  fetchRoomData();
  fetchBookingData();
});

// <--------------------> GLOBALS <--------------------> //
let customerId;

// <--------------------> QUERY SELECTORS - BTN'S <--------------------> //
const loginBtn = document.getElementById('submit-login-forms-button');
const searchBookingsBtn = document.getElementById('search-bookings-button');
const pastBookingsBtn = document.getElementById('past-bookings-button');
const upcomingBookingsBtn = document.getElementById('upcoming-bookings-button');

// <--------------------> QUERY SELECTORS - FORMS <--------------------> //
const mainSection = document.querySelector('.booking-section');
const loginSection = document.querySelector('.login-container');
const mainHeader = document.getElementById('main-header');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let errorMessage = document.getElementById("error-message");


//<--------------------> LOGIN FUNCTIONS <--------------------> //
const validateLogin = (username, password) => {
  const usernameMatch = username.match(/\d+/);
  if (usernameMatch) {
    
    const customerId = usernameMatch[0];
    const customerName = username.replace(customerId, "");
    const newUserName = customerName + customerId;

    if (newUserName === `customer${customerId}` 
      && password === "overlook2021") {
      return customerId;
    }
  }
  return null;
};

const loginHandler = (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const customerId = validateLogin(username, password);

  if (customerId) {
    console.log("Login successful!");
    loginSection.style.display = 'none';
    mainSection.style.display = 'flex';
    mainHeader.style.display = 'flex';
    fetchCustomerData(customerId);
  } else {
    errorMessage.innerText = "USERNAME OR PASSWORD IS INVALID.";
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 4000);
  }
};
loginBtn.addEventListener('click', loginHandler);

//<--------------------> CUSTOMERS DISPLAY <--------------------> //




