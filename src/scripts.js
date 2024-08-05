import './css/styles.css';
import './images/bed.svg';
import './images/sadface.svg';

// <-------------------> API CALLS / LOGIC FUNCTIONS <----------------------> //
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

// <----------------------------> GLOBALS <----------------------------> //
let allBookings = [];
let allRooms = [];
let customersAPIData = [];
let roomsAPIData = [];
let userID = 10;
let date;

// <--------------------> QUERY SELECTORS - BTN'S <--------------------> //
const loginBtn = document.getElementById('submit-login-forms-button');
const searchBookingsBtn = document.getElementById('search-bookings-button');
const pastBookingsBtn = document.getElementById('past-bookings-button');
const upcomingBookingsBtn = document.getElementById('upcoming-bookings-button');

// <---------> QUERY SELECTORS - WRAPPERS AND SECTIONS <-----------> //
const mainSection = document.querySelector('.booking-section');
const loginSection = document.querySelector('.login-container');
const mainHeader = document.getElementById('main-header');
const savedBookingsWrapper = document.getElementById('saved-bookings-wrapper');
const makeNewBookingWrapper =
document.getElementById('make-new-booking-wrapper');
let totalSpentDiv = document.getElementById('total-spent');

// <--------------------> QUERY SELECTORS - FORMS <--------------------> //
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let errorMessage = document.getElementById("error-message");


// <---------------------------> FUNCTIONS <---------------------------> //
const getPostLoginData = () => {
  // GET DATA FOR THE SINGLE CUSTOMER, 10 ({...})
  customersAPIData = fetchCustomerData(userID);
  // GET ALL OF THE ROOMS ({ROOMS: [{...}]})
  roomsAPIData = fetchRoomData();
  // GET ALL OF THE BOOKINGS ({BOOKINGS: [{...}]})
  fetchBookingData().then((data) => {
    allBookings = data.bookings;
    let filteredRooms = getCustomerBookings(data.bookings, userID)
    // PASS THE FILTERED ROOM DATA INTO THE RENDER FUNCTION
    renderCustomerRooms(filteredRooms);
  });
};

// ADD EVENT LISTENERS AFTER CUSTOMER DATA IS RETRIEVED 
const setupEventListeners = () => {
  searchBookingsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let calendarInput = document.getElementById('calendar-input');
    let roomTagsInput = document.getElementById('room-tags');
    // GET SEARCH PARAMETERS FROM USER INPUT
    date = calendarInput.value
    let roomTagsInputValue = roomTagsInput.value;
    console.log(date, roomTagsInputValue);
    // FILTER THE ROOMS BY THE SEARCH INPUTS
    fetchRoomData().then((data) => {
      allRooms = data.rooms;
      let filteredRooms =
      getAvailableRooms(date, allBookings, allRooms);
      // FORMAT THE DATA TAG FROM 'DATA-NAME' TO 'DATA NAME'
      roomTagsInput = roomTagsInputValue.split('-').join(' ');
      let filteredRoomsByType = 
      filterRoomsByType(filteredRooms, roomTagsInput);
      // UPDATE THE MAKENEWBOOKINGS WRAPPER WITH THE ROOMS
      renderAvailableRooms(filteredRoomsByType);
    });
  });
};

const bookRoom = (roomNumber) => {
  // PARSE THIS TO AN INTEGER
  roomNumber = parseInt(roomNumber);
  // FIND THE ROOM
  const room = allRooms.find((room) => room.number === parseInt(roomNumber));
  // CONFIRM WITH THE USER
  const confirmation = 
  confirm (`Do you want to book this 
    ${room.roomType} for $${room.costPerNight}?`);
  
  if (confirmation) {
    console.log('Attempting to book room...');

    const newBooking = {
      userID, 
      date, 
      roomNumber
    };
    // "2022/01/30" -> 2022/01/30
    postBookingData(newBooking)
      .then(() => {
        // Re-fetch the booking data and re-render the UI (??)
        return fetchBookingData();
      })
      .then((data) => {
        allBookings = data.bookings;
        const filteredRooms = getCustomerBookings(allBookings, userID);
        console.log('CUSTOMER ROOMS HERE:', filteredRooms);
        renderCustomerRooms(filteredRooms);
        alert('Your room was booked successfully!');
      })
      .catch(error => {
        console.error('Error booking room:', error);
        alert('There was an error booking your room. Please try again.');
      });
  } else {
    console.log('User declined booking.');
    return;
  }
};

const renderAvailableRooms = (filteredRooms) => {
  // OPEN CONTAINER FOR NEW ROOMS
  let outContainer = `<div class="booking-tiles">`;

  // GENERATE NEW HTML (( USING FOR OF >:D ))
  for (let room of filteredRooms) {
    outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="turing logo">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-type">ROOM TYPE: ${room.roomType.toUpperCase()}</p>
        <p id="booking-num-beds">BED SIZE: ${room.bedSize.toUpperCase()}</p>
        <p id="booking-cost">COST PER NIGHT: ${room.costPerNight}</p>
        <button id="${room.number}">BOOK</button>
      </div>
    </container>`
  }

  // IF THERE ARE NOT ANY ROOMS, INDICATE THAT TO THE USER
  if (!filteredRooms.length) {
    outContainer +=
      '<div>NO ROOMS AVAILABLE MATCHING YOUR INPUT, WE ARE SORRY!</div>'
  }

  // CLOSE THE OUT CONTAINER
  outContainer += '</div>'
  makeNewBookingWrapper.innerHTML = outContainer;
  makeNewBookingWrapper.addEventListener('click', (event) => {
    event.preventDefault();
    let bookingRoomNumber = event.target.id;
    console.log('Room to book', bookingRoomNumber)
    bookRoom(bookingRoomNumber)
  });
};

const renderCustomerRooms = (filteredRooms) => {
  // OPEN AN OUT CONTAINER
  let outContainer = `<div class="booking-tiles">`;
  // CONSTRUCT THE FILTERED ROOMS HTML
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
  // CLOSE THE OUT CONTAINER
  outContainer += '</div>'
  savedBookingsWrapper.innerHTML = outContainer;
};

const handleLoginSuccess = () => {
  // LOGGING
  console.log("Login successful!");
  // GET THE POST LOGIN DATA
  getPostLoginData();
  // RENDER THE APP //
  loginSection.style.display = 'none';
  mainSection.style.display = 'flex';
  mainHeader.style.display = 'flex';
  // SETUP EVENT LISTENERS
  setupEventListeners();
};

const handleLoginFailure = () => {
  errorMessage.innerText = "INVALID USERNAME OR PASSWORD.";
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 4000);
};

// <------------------------------> LOGIN <-----------------------------> //
const handleLogin = () => {
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

// INITIALIZE THE APPLICATION BABY!
handleLogin();
