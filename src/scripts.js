import './css/styles.css';

const { fetchCustomerData, fetchRoomData, fetchBookingData, postBookingData,
  customersAPI, roomsAPI, bookingsAPI } = require('../src/apiCalls.js');

const { getCustomerBookings, getAvailableRooms, getSumOfAllBookings,
  filterRoomsByType } = require('../src/main.js');

// <--------------------> EVENT LISTENERS <----------------------> //
document.addEventListener('DOMContentLoaded', () => {
  fetchRoomData();
  fetchBookingData();
});

// <----------------------------> GLOBALS <----------------------------> //
let allBookings = [];
let pastBookings = [];
let UpcomingBookings = [];

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
const savedBookingsWrapper = document.getElementById('saved-bookings-wrapper');

const displayCustomerBookings = () => {
  const customerBookings = getCustomerBookings(bookingsAPI, 10);
  console.log(customerBookings);
  savedBookingsWrapper.innerHTML = '';

  if (customerBookings.length > 0) {
    customerBookings.forEach(booking => {
      savedBookingsWrapper.innerHTML = `
<container class="booking-card" role="article">
  <div class="booking-card-image">
    <img src="placeholder.jpg" alt="Room Image">
  </div>
  <div class="booking-card-content">
    <p id="booking-room-number">Room Number: ${booking.roomNumber}</p>
    <p id="booking-date">Date: ${booking.date}</p>
  </div>
</container>
      `;
    });

  } else {
    const noBookingsMessage = document.createElement('p');
    noBookingsMessage.innerText = 'YOU HAVE NO BOOKINGS WITH US.';
    savedBookingsWrapper.appendChild(noBookingsMessage);
  }
};

//<------------------------------> LOGIN <-----------------------------> //
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (username === 'customer10' && password === 'overlook2021') {

    console.log("Login successful!");
    loginSection.style.display = 'none';
    mainSection.style.display = 'flex';
    mainHeader.style.display = 'flex';
    // fetchCustomerData()

  } else {
    errorMessage.innerText = "INVALID USERNAME OR PASSWORD.";
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 4000);
  }
  displayCustomerBookings();
});




// loginBtn.addEventListener('click', loginHandler);
// loginBtn.addEventListener('click', loginHandler);
// loginBtn.addEventListener('click', loginHandler);







