import './css/styles.css';
import './images/bed.svg';
import './images/sadface.svg';

// API CALLS / LOGIC FUNCTIONS
const {
  fetchCustomerData,
  fetchRoomData,
  fetchBookingData,
  postBookingData
} = require('../src/apiCalls.js');

const {
  getCustomerBookings,
  getAvailableRooms,
  getSumOfAllBookings,
  filterRoomsByType
} = require('../src/main.js');

// GLOBALS
let allBookings = [];
let allRooms = [];
// eslint-disable-next-line no-unused-vars
let customersAPIData = [];
let userID = 11;
let date;

// QUERY SELECTORS - BTN'S
const loginBtn = document.getElementById('submit-login-forms-button');
const searchBookingsBtn = document.getElementById('search-bookings-button');
const pastBookingsBtn = document.getElementById('past-bookings-button');
const upcomingBookingsBtn = document.getElementById('upcoming-bookings-button');

// QUERY SELECTORS - WRAPPERS AND SECTIONS
const mainSection = document.querySelector('.booking-section');
const loginSection = document.querySelector('.login-container');
const mainHeader = document.getElementById('main-header');
const savedBookingsWrapper = document.getElementById('saved-bookings-wrapper');
const makeNewBookingWrapper = 
document.getElementById('make-new-booking-wrapper');
let totalSpentDiv = document.getElementById('total-spent');
const mainForm = document.getElementById('main-app');

// QUERY SELECTORS - FORMS
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let errorMessage = document.getElementById("error-message");

// HELPER FUNCTIONS
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

const clearSearchedRoomsContainer = () => {
  makeNewBookingWrapper.innerHTML = '';
  makeNewBookingWrapper.style.height = 'auto';
};

// --------------> RETRIEVE NECESSARY ON-LOAD DATA <--------------- //
const getPostLoginData = () => {
  customersAPIData = fetchCustomerData(userID);
  let filteredRooms = getCustomerBookings(allBookings, userID)
  renderCustomerBookings(filteredRooms);
};

// --------------> RENDER UP TO DATE AVAIL ROOMS <---------------- //
const renderAvailableRooms = (filteredRooms) => {
  let outContainer = `<div class="booking-tiles">`;

  for (let room of filteredRooms) {
    outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="hotel bed image">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-type">ROOM TYPE: ${room.roomType.toUpperCase()}</p>
        <p id="booking-num-beds">BED SIZE: ${room.bedSize.toUpperCase()}</p>
        <p id="booking-cost">COST PER NIGHT: ${room.costPerNight}</p>
        <button id="${room.number}">BOOK</button>
      </div>
    </container>`;
  }

  if (!filteredRooms.length) {
    outContainer += 
    '<div>NO ROOMS AVAILABLE MATCHING YOUR INPUT, WE ARE SORRY!</div>';
  }
  outContainer += '</div>';
  makeNewBookingWrapper.innerHTML = outContainer;
};

// --------------> RENDER BOOKINGS SECTION ON LOGIN <---------------- //
const renderCustomerBookings = (filteredRooms) => {
  let outContainer = `<div class="booking-tiles">`;

  if (filteredRooms.length > 0) {
    for (let room of filteredRooms) {
      outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="hotel bed image">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-number">ROOM NUMBER: ${room.roomNumber}</p>
        <p id="booking-date">DATE: ${room.date}</p>
      </div>
    </container>`;
    }
  } else {
    outContainer += 
    `<p id="no-bookings-message">YOU HAVE NO UPCOMING BOOKINGS.</p>`;
  }
  outContainer += '</div>';
  savedBookingsWrapper.innerHTML = outContainer;
};

// ----------> FILTER AND RENDER BOOKINGS BASED ON DATE <------------ //
const filterBookingsByDate = (type) => {
  const today = new Date();
  let filteredBookings = [];

  if (type === 'past') {
    filteredBookings = allBookings.filter(booking =>
      booking.userID === userID && new Date(booking.date) < today);
  } else if (type === 'upcoming') {
    filteredBookings = allBookings.filter(booking =>
      booking.userID === userID && new Date(booking.date) >= today);
  }
  renderCustomerBookings(filteredBookings);
};

// -------------> POST/FETCH/RENDER NEWLY BOOKED ROOM <--------------- //
const bookRoom = (roomNumber) => {
  roomNumber = parseInt(roomNumber);
  const room = allRooms.find((room) => room.number === parseInt(roomNumber));
  const confirmation = 
  confirm(`Book this ${room.roomType} for $${room.costPerNight}?`);

  if (confirmation) {
    const newBooking = { userID, date, roomNumber };

    postBookingData(newBooking)
      .then(() => fetchBookingData())
      .then((data) => {
        allBookings = data.bookings;
        const filteredRooms = getCustomerBookings(allBookings, userID);
        renderCustomerBookings(filteredRooms);
        clearSearchedRoomsContainer();
        const totalSpent = getSumOfAllBookings(allBookings, allRooms, userID);
        totalSpentDiv.innerText = 
        `YOU HAVE SPENT A TOTAL OF $${totalSpent.toFixed(2)} ON YOUR BOOKINGS.`;
      })
      .catch(error => {
        console.error('Error booking room:', error);
        alert('There was an error booking your room. Please try again.');
      });
  }
};

// --------> SUCCESFUL LOGIN SCENARIO <---------- //
const handleLoginSuccess = () => {
  getPostLoginData();
  const totalSpent = getSumOfAllBookings(allBookings, allRooms, userID);
  totalSpentDiv.innerText = 
  `YOU HAVE SPENT A TOTAL OF $${totalSpent.toFixed(2)} ON YOUR BOOKINGS.`;

  mainForm.style.display = 'flex';
  loginSection.style.display = 'none';
  mainSection.style.display = 'flex';
  mainHeader.style.display = 'flex';
  setupEventListeners();
};

// --------> FAILED LOGIN SCENARIO <---------- //
const handleLoginFailure = () => {
  errorMessage.innerText = "INVALID USERNAME OR PASSWORD.";
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 4000);
};

// --------> ADD E-LSTNR'S TO GENERATED CONTENT <---------- //
const setupEventListeners = () => {
  searchBookingsBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let calendarInput = document.getElementById('calendar-input');
    let roomTagsInput = document.getElementById('room-tags');
    const todaysDate = getCurrentDate();
    const selectedDate = calendarInput.value;

    if (new Date(selectedDate) < new Date(todaysDate)) {
      alert("Input was a past date, please try again.");
      return;
    }
    if (!calendarInput.value) {
      alert('Please select a date before searching.');
      return;
    }

    date = calendarInput.value;
    let roomTagsInputValue = roomTagsInput.value;
    let filteredRooms = getAvailableRooms(date, allBookings, allRooms);
    roomTagsInput = roomTagsInputValue.split('-').join(' ');
    let filteredRoomsByType = filterRoomsByType(filteredRooms, roomTagsInput);
    renderAvailableRooms(filteredRoomsByType);
  });

  pastBookingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    filterBookingsByDate('past');
  });

  upcomingBookingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    filterBookingsByDate('upcoming');
  });
};

// -> HANDLE BOTH LOGIN OUTCOMES <- //
const handleLogin = () => {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username === 'customer11' && password === 'overlook2021') {
      handleLoginSuccess();
    } else {
      handleLoginFailure();
    }
  });
};

// -----------> VERIFY CORRECT ROOM TO BOOK <------------ //
makeNewBookingWrapper.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.type === 'submit') {
    let bookingRoomNumber = e.target.id;
    bookRoom(bookingRoomNumber);
  }
});
// -------------> INITIALIZE APPLICATION! <------------- //
document.addEventListener('DOMContentLoaded', () => {
  fetchRoomData().then((data) => {
    allRooms = data.rooms;
  });
  fetchBookingData().then((data) => {
    allBookings = data.bookings;
  });
});

handleLogin();