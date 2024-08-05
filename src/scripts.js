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
let allRooms = [];
let customersAPIData = [];
let roomsAPIData = [];
let userID = 10;

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
// <--------------------> QUERY SELECTORS - FORMS <--------------------> //
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let errorMessage = document.getElementById("error-message");

const getPostLoginData = () => {
  // Get data for the single customer, 10 ({...})
  customersAPIData = fetchCustomerData(userID);
  // Get all of the rooms ({rooms: [{...}]})
  roomsAPIData = fetchRoomData();
  // Get all of the bookings ({bookings: [{...}]})
  fetchBookingData().then((data) => {
    allBookings = data.bookings;
    let filteredRooms = getCustomerBookings(data.bookings, userID)
    // Pass the filtered room data into the render function
    renderCustomerRooms(filteredRooms);
  });
}

// These are applied after a successful login operation
const setupEventListeners = () => {
  searchBookingsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let calendarInput = document.getElementById('calendar-input')
    let roomTagsInput = document.getElementById('room-tags');
    // Get search params
    let calendarInputValue = calendarInput.value;
    let roomTagsInputValue = roomTagsInput.value;
    console.log(calendarInputValue, roomTagsInputValue);
    // Filter the rooms by the search params
    fetchRoomData().then((data) => {
      allRooms = data.rooms
      let filteredRooms =
        getAvailableRooms(calendarInputValue, allBookings, allRooms)
      // Format the data tag from 'data-name' to 'data name'
      roomTagsInput = roomTagsInputValue.split('-').join(' ');
      let filteredRoomsByType = filterRoomsByType(filteredRooms, roomTagsInput)
      // Update the makeNewBookingsWrapper with the rooms
      renderAvailableRooms(filteredRoomsByType)
    })
  })
}

const bookRoom = (roomNumber) => {
  // Parse this to an integer
  roomNumber = parseInt(roomNumber)
  // Find the room
  const room = allRooms.find((room) => room.number === parseInt(roomNumber));
  // Confirm with the user
  const confirmation = confirm(`Do you want to book the ${room.roomType} 
    with a ${room.bedSize} bed for $${room.costPerNight}?`);
  if (confirmation) {
    console.log('Attempting to book room...');
    // room booking logic here...
    // 1. Make a post request to add the booking to the API
    // 2. Re-retrieve the data over the API for the user -> re-render 
    //     (Best practice, supports single source of truth)
    
    alert('Your room was booked successfully!')
  } else {
    console.log('User declined booking.');
    return
  }
};

const renderAvailableRooms = (filteredRooms) => {
  // Open an out container
  let outContainer = `<div class="booking-tiles">`;

  // Construct the filtered rooms html
  for (let room of filteredRooms) {
    outContainer += `<container class="booking-card" role="article">
      <div class="booking-card-image">
        <img src="./images/bed.svg" alt="turing logo">
      </div>
      <div class="booking-card-content">
        <p id="booking-room-type">Room Type: ${room.roomType.toUpperCase()}</p>
        <p id="booking-num-beds">Bed Size: ${room.bedSize.toUpperCase()}</p>
        <p id="booking-cost">Cost Per Night: ${room.costPerNight}</p>
        <button id="${room.number}">BOOK</button>
      </div>
    </container>`
  }

  // If there are not any rooms, indicate that to the user
  if (!filteredRooms.length) {
    outContainer +=
      '<div>No rooms available, please try different search params.</div>'
  }

  // Close the out container
  outContainer += '</div>'
  makeNewBookingWrapper.innerHTML = outContainer;
  makeNewBookingWrapper.addEventListener('click', (event) => {
    event.preventDefault();
    let bookingRoomNumber = event.target.id;
    console.log('Room to book', bookingRoomNumber)
    bookRoom(bookingRoomNumber)
  })
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
  // Logging
  console.log("Login successful!");
  // Get the post login data
  getPostLoginData();
  // Render the app //
  loginSection.style.display = 'none';
  mainSection.style.display = 'flex';
  mainHeader.style.display = 'flex';
  // Setup event listeners
  setupEventListeners()
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

// Initialize application baby!!!
handleLogin();