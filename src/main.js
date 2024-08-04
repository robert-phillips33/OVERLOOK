
export const getCustomerBookings = (bookings, customerId) => {
  const customerBookings = bookings.filter((booking) => {
    return booking.userID === customerId;
  });
  return customerBookings;
};

export const getSumOfAllBookings = (bookings, rooms, customerId) => {
  const customerBookings = bookings.filter(booking =>
    booking.userID === customerId);

  let totalPrice = 0;

  customerBookings.forEach(booking => {
    const thisRoom = rooms.find(room => room.number === booking.roomNumber);
    totalPrice += thisRoom.costPerNight;
  });
  return totalPrice;
};

export const getAvailableRooms = (dateSelection, bookings, rooms) => {

  dateSelection = dateSelection.split('-').join('/');
  const roomsToRemove = bookings
    .filter(booking => booking.date === dateSelection)
    .map(booking => booking.roomNumber);

  const availableRooms = rooms.filter(room =>
    !roomsToRemove.includes(room.number));
  console.log(availableRooms);
  return availableRooms
};

export const filterRoomsByType = (rooms, roomType) => {
  if (roomType === 'all') {
    return rooms;
  }
  const filteredRooms = rooms.filter(room => room.roomType === roomType)
  return filteredRooms;
};
