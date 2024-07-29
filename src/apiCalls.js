export const fetchCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => console.error('Error fetching customers:', error));
};

export const fetchRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.error('Error fetching rooms:', error));
};

export const fetchBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.error('Error fetching bookings:', error));
};

// example of my booking object! leaving here for now,
// unsure if it needs to exist here. // 
export const newBooking = {
  userID: 48,
  date: "2019/09/23",
  roomNumber: 4
};

export const postBooking = (newBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking)
  })
    .then(response => response.json())
    .catch(error => console.error('Error posting booking:', error));
};

