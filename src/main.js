
export const bookRoom = (userID, roomNumber, date) => {

  const bookingObj = {
    userID,
    roomNumber,
    date,
  };
  return bookingObj;
};

export const getCustomerBookings = (bookings, customerID) => {

  const customerBookings = bookings.filter((booking) => {
    return booking.customerId === customerID;
  });
  return customerBookings;
};

export const getSumOfAllBookings = (bookings, rooms, customerID) => {
  
  const customerBookings = bookings.filter(booking =>
    booking.customerId === customerID);

  let totalPrice = 0;
  customerBookings.forEach(booking => {
    const room = rooms.find(room => room.number === booking.roomNumber);
    if (room) {
      totalPrice += room.costPerNight;
    }
  });
  return totalPrice;
};

export const getAvailableRooms = (dateSelection, bookings, rooms) => {
  
  const roomsToRemove = bookings
    .filter(booking => booking.date === dateSelection)
    .map(booking => booking.roomNumber);

  const availableRooms = rooms.filter(room => 
    !roomsToRemove.includes(room.number));
  
  return availableRooms
};

export const filterRoomsByType = (rooms, roomType) => {

  const filteredRooms = rooms.filter(room => room.type === roomType)
  return filteredRooms;
};