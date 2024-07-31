
const { expect } = require('chai');

const {
  
  getCustomerBookings,

} = require('../src/main.js');

const bookings = require('./data/sample-bookings.js');
// const rooms = require('./data/sample-rooms.js');
// const customers = require('./data/sample-customers.js');

describe('getCustomerBookings', () => {
  it('should be a function', () => {
    expect(getCustomerBookings).to.be.a('function');
  });
  it('should return an array containing customer bookings', () => {
    const customerId = 1;
    const customerBookings = getCustomerBookings(bookings, customerId)
    expect(customerBookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12
      }
    ])
  })
});







