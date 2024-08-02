
import './css/styles.css';

const {

  initializeApp,
  // fetchCustomerData,
  // fetchRoomData,
  // fetchBookingData,
  // postBookingData,
  // customersAPI,
  // roomsAPI,
  // bookingsAPI,

} = require('../src/apiCalls.js');

// EVENT LISTENERS //
document.addEventListener('DOMContentLoaded', initializeApp);
// <------------> //


// QUERY SELECTORS - BUTTONS //
const loginBtn = document.getElementById('submit-login-forms-button');
const searchBookingsBtn = document.getElementById('search-bookings-button');
const pastBookingsBtn = document.getElementById('past-bookings-button');
const upcomingBookingsBtn = document.getElementById('upcoming-bookings-button');
// <-----------------------> //

// QUERY SELECTORS - FORMS //
const mainSection = document.querySelector('.booking-section');
const loginSection = document.querySelector('.login-container');
const mainHeader = document.getElementById('main-header');
// <---------------------> //


export const showMainPage = (e) => {
  e.preventDefault();
  loginSection.style.display = 'none';
  mainSection.style.display = 'flex';
  mainHeader.style.display = 'flex';
  console.log('heeeeeeeeeeeeeeeeeeeello')
};
loginBtn.addEventListener('click', showMainPage);

