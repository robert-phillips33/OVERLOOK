import chai from 'chai';

const expect = chai.expect;
const {

  getCustomerBookings,
  getSumOfAllBookings,
  getAvailableRooms,
  filterRoomsByType

} = require('../src/main.js');

const { bookings } = require('./data/sample-bookings.js');
const { rooms } = require('./data/sample-rooms.js');

describe('getCustomerBookings', () => {
  it('should be a function', () => {
    expect(getCustomerBookings).to.be.a('function');
  });
  it('should return an array containing customer bookings', () => {
    const customerId = 100;
    const customerBookings = getCustomerBookings(bookings, customerId)
    expect(customerBookings).to.deep.equal([
      {
        id: "test-booking-1",
        userID: 100,
        date: "2024/01/01",
        roomNumber: 100
      },
      {
        id: "test-booking-2",
        userID: 100,
        date: "2024/01/02",
        roomNumber: 100
      },
    ])
  })
});

describe('getSumOfAllBookings', () => {
  it('should be a function', () => {
    expect(getSumOfAllBookings).to.be.a('function');
  });
  it('should return total amount spent on rooms by a given customer',
    () => {
      const customerId = 100;
      const totalPrice = getSumOfAllBookings(bookings, rooms, customerId);
      expect(totalPrice).to.equal(400)
    });
  it('should return zero if no bookings exist', () => {
    const customerId = 420;
    const totalPrice = getSumOfAllBookings(bookings, rooms, customerId);
    expect(totalPrice).to.equal(0);
  });
});

describe('getAvailableRooms', () => {
  const bookings = [
    { id: '1', userID: 100, date: '2024/07/30', roomNumber: 1 },
    { id: '2', userID: 100, date: '2024/07/31', roomNumber: 2 },
    { id: '3', userID: 101, date: '2024/07/30', roomNumber: 3 },
    { id: '4', userID: 101, date: '2024/07/31', roomNumber: 4 },
  ];

  const rooms = [
    {
      number: 1, roomType: 'residential suite', bidet: true,
      bedSize: 'queen', numBeds: 1, costPerNight: 358.4
    },
    {
      number: 2, roomType: 'suite', bidet: false,
      bedSize: 'full', numBeds: 2, costPerNight: 477.38
    },
    {
      number: 3, roomType: 'single room', bidet: false,
      bedSize: 'king', numBeds: 1, costPerNight: 491.14
    },
    {
      number: 4, roomType: 'single room', bidet: false,
      bedSize: 'queen', numBeds: 1, costPerNight: 429.44
    },
  ];

  it('should be a function', () => {
    expect(getAvailableRooms).to.be.a('function');
  });

  it('should only show rooms that are available given a selected date', () => {
    const dateSelection = '2024/07/30';
    const availableRooms = getAvailableRooms(dateSelection, bookings, rooms);

    expect(availableRooms).to.deep.equal([
      {
        number: 2, roomType: 'suite', bidet: false,
        bedSize: 'full', numBeds: 2, costPerNight: 477.38
      },
      {
        number: 4, roomType: 'single room', bidet: false,
        bedSize: 'queen', numBeds: 1, costPerNight: 429.44
      }
    ]);
  });

  it('should show no rooms if there are none available that day', () => {
    const bookings = [
      { id: '7', userID: 100, date: '2024/07/30', roomNumber: 1 },
      { id: '8', userID: 100, date: '2024/07/30', roomNumber: 2 },
    ];
    const rooms = [
      {
        number: 1, roomType: 'residential suite', bidet: true,
        bedSize: 'queen', numBeds: 1, costPerNight: 358.4
      },
      {
        number: 2, roomType: 'suite', bidet: false,
        bedSize: 'full', numBeds: 2, costPerNight: 477.38
      },
    ];
    const dateSelection = '2024/07/30';
    const availableRooms = getAvailableRooms(dateSelection, bookings, rooms);

    expect(availableRooms).to.deep.equal([]);
  });
});

describe('filterRoomsByType', () => {
  const rooms = [
    {
      number: 1, roomType: 'residential suite', bidet: true,
      bedSize: 'queen', numBeds: 1, costPerNight: 358.4
    },
    {
      number: 2, roomType: 'suite', bidet: false,
      bedSize: 'full', numBeds: 2, costPerNight: 477.38
    },
    {
      number: 3, roomType: 'single room', bidet: false,
      bedSize: 'king', numBeds: 1, costPerNight: 491.14
    },
    {
      number: 4, roomType: 'single room', bidet: false,
      bedSize: 'queen', numBeds: 1, costPerNight: 429.44
    },
  ];

  it('should be a function', () => {
    expect(filterRoomsByType).to.be.a('function');
  });

  it('should return rooms that match the given room type', () => {
    const roomType = 'single room';
    const filteredRooms = filterRoomsByType(rooms, roomType);

    expect(filteredRooms).to.deep.equal([
      {
        number: 3, roomType: 'single room', bidet: false,
        bedSize: 'king', numBeds: 1, costPerNight: 491.14
      },
      {
        number: 4, roomType: 'single room', bidet: false,
        bedSize: 'queen', numBeds: 1, costPerNight: 429.44
      }
    ]);
  });

  it('should return no rooms if no available rooms match selected type', () => {
    const roomType = 'junior suite';
    const filteredRooms = filterRoomsByType(rooms, roomType);

    expect(filteredRooms).to.deep.equal([]);
  });
});









