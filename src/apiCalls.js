export let customersAPI = [];
export let roomsAPI = [];
export let bookingsAPI = [];
export let newBooking;

export const fetchCustomerData = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      customersAPI = data;
      console.log('Customers:', customersAPI);
    })
    .catch(error => console.error('Error fetching customers:', error));
};

export const fetchRoomData = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      roomsAPI = data;
      console.log('Rooms:', roomsAPI);
    })
    .catch(error => console.error('Error fetching rooms:', error));
};

export const fetchBookingData = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      bookingsAPI = data;
      console.log('Bookings:', bookingsAPI);
    })
    .catch(error => console.error('Error fetching bookings:', error));
};

export const postBookingData = (bookingData) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      newBooking = data;
      alert('Room Booked! Thank you!');
    })
    .catch(error => console.error('Error posting booking:', error));
};

export const initializeApp = () => {
  Promise.all([fetchCustomerData(), fetchRoomData(), fetchBookingData()])
    .then(() => {
      console.log('Customers:', customersAPI);
      console.log('Rooms:', roomsAPI);
      console.log('Bookings:', bookingsAPI);
    })
    .catch(error => console.error('Error initializing app:', error));
};