
const { expect } = require('chai');

const {
  bookRoom,
  getCustomerBookings,
  getSumOfAllBookings,
  getAvailableRooms,
  filterRoomsByType
} = require('../src/main.js');

const bookings = require('./data/sample-bookings.js');
const rooms = require('./data/sample-rooms.js');
const customers = require('./data/sample-customers.js');

describe('bookRoom', () => {
  it('should create a new booking and return the booking object', () => {
    const userID = 1;
    const roomNumber = 105;
    const date = "2022/04/25";

    const newBooking = bookRoom(userID, roomNumber, date);

    expect(newBooking).to.be.an('object');
    expect(newBooking).to.have.property('userID', userID);
    expect(newBooking).to.have.property('roomNumber', roomNumber);
    expect(newBooking).to.have.property('date', date);
  });
});

