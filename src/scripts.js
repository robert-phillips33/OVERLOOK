import './css/styles.css';
import './images/bed.svg';
import './images/sadface.svg';

// <-------------------> DATA LAYER CALLS <----------------------> //
const {
  fetchCustomerData,
  fetchRoomData,
  fetchBookingData,
} = require('../src/apiCalls.js');

const {
  getCustomerBookings,
  getAvailableRooms,
  getSumOfAllBookings,
  filterRoomsByType
} = require('../src/main.js');

// <----------------------------> GLOBALS <----------------------------> //
let allBookings = [];
let pastBookings = [];
let UpcomingBookings = [];
let customerBookings = [];
let bookingsAPIData = [];
let bookingsByCustomer = [];
let customersAPIData = [];
let roomsAPIData = [];
let newBooking = [];
let userID;

// <--------------------> QUERY SELECTORS - BTN'S <--------------------> //
const loginBtn = document.getElementById('submit-login-forms-button');
const searchBookingsBtn = document.getElementById('search-bookings-button');
const pastBookingsBtn = document.getElementById('past-bookings-button');
const upcomingBookingsBtn = document.getElementById('upcoming-bookings-button');

// <--------------------> QUERY SELECTORS - FORMS <--------------------> //
const mainSection = document.querySelector('.booking-section');
const loginSection = document.querySelector('.login-container');
const mainHeader = document.getElementById('main-header');
const savedBookingsWrapper = document.getElementById('saved-bookings-wrapper');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let errorMessage = document.getElementById("error-message");

const renderCustomerRooms = (filteredRooms) => {
  // Open an out container
  let outContainer = `<div class="booking-tiles">`;
  // Construct the filtered rooms html
  for (let room of filteredRooms) {
    outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="turing logo">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-number">Room Number: ${room.roomNumber}</p>
        <p id="booking-date">Date: ${room.date}</p>
      </div>
    </container>`
  }
  // Close the out container
  outContainer += '</div>'
  savedBookingsWrapper.innerHTML = outContainer;
};

const renderCustomerRooms = (filteredRooms) => {
  // Open an out container
  let outContainer = `<div class="booking-tiles">`;
  // Construct the filtered rooms html
  for (let room of filteredRooms) {
    outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="turing logo">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-number">Room Number: ${room.roomNumber}</p>
        <p id="booking-date">Date: ${room.date}</p>
      </div>
    </container>`
  }
  // Close the out container
  outContainer += '</div>'
  savedBookingsWrapper.innerHTML = outContainer;
};

const handleLoginSuccess = () => {
  console.log("Login successful!");
  // *** GET DATA *** // 
  let defaultCustomerId = 10
  // Get data for the single customer, 10 ({...})
  customersAPIData = fetchCustomerData(defaultCustomerId);
  // Get all of the rooms ({rooms: [{...}]})
  roomsAPIData = fetchRoomData();
  // Get all of the bookings ({bookings: [{...}]})
  fetchBookingData().then((data) => {
    let filteredRooms = getCustomerBookings(data.bookings, defaultCustomerId)
    // Pass the filtered room data into the render function
    renderCustomerRooms(filteredRooms);
  });
  // HANDLE RENDERING //
  loginSection.style.display = 'none';
  mainSection.style.display = 'flex';
  mainHeader.style.display = 'flex';
}

const handleLoginFailure = () => {
  errorMessage.innerText = "INVALID USERNAME OR PASSWORD.";
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 4000);
};

const handleLogin = () => {
  // <------------------------------> LOGIN <-----------------------------> //
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username === 'customer10' && password === 'overlook2021') {
      handleLoginSuccess();
    } else {
      handleLoginFailure();
    }
  });
};

// Initialization
handleLogin();



