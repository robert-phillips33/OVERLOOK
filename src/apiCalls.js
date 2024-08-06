// API Call Exports
export const fetchCustomerData = () => {
  // Declare container
  let customersAPIdata = [];
  return fetch(`http://localhost:3001/api/v1/customers/11`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response failed.');
      }
      return response.json();
    })
    .then(data => {
      // Set the data to the container
      customersAPIdata = data;
      // Logging
      console.log('Customer Data:', customersAPIdata);
      // Return the container
      // NOTE: container is an object, with the property 'customers' as an array
      // {...}
      return customersAPIdata;
    })
    .catch(error => console.error('Error fetching customers:', error));
};

export const fetchRoomData = () => {
  // Declare container
  let roomsAPIdata = [];
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response failed.');
      }
      return response.json();
    })
    .then(data => {
      // Set the data to the container
      roomsAPIdata = data;
      // Logging
      console.log('Rooms:', roomsAPIdata);
      // Return the container;
      // NOTE: container is an object, with the property 'rooms' as an array
      // {rooms: [{...}]}
      return roomsAPIdata;
    })
    .catch(error => console.error('Error fetching rooms:', error));
};

export const fetchBookingData = () => {
  // Declare container
  let bookingsAPIdata = [];
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response failed.');
      }
      return response.json();
    })
    .then(data => {
      // Set the data to the container
      bookingsAPIdata = data;
      // Logging
      console.log('Bookings:', bookingsAPIdata);
      // Return the container
      // NOTE: container is an object, with the property 'bookings' as an array
      // {bookings: [{...}]}
      return bookingsAPIdata;
    })
    .catch(error => console.error('Error fetching bookings:', error));
};

export const postBookingData = (bookingData) => {
  bookingData.date = bookingData.date.replaceAll('-', '/');
  console.log(bookingData);
  let newBooking;
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response failed.');
      }
      return response.json();
    })
    .then(data => {
      // Set the data to the container
      newBooking = data;
      // User Alert / Notification
      alert('Room Booked! Thank you!');
      // Return the container
      return newBooking;
    })
    .catch(error => console.error('Error posting booking:', error));
};

