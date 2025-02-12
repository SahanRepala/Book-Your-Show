// Global Variables
let selectedMovie = null;
let selectedSeats = [];
let totalPrice = 0; // Track total price

// DOM Elements
const homepage = document.getElementById("homepage");
const movieDetailsPage = document.getElementById("movie-details");
const bookingPage = document.getElementById("booking-page");
const confirmationPage = document.getElementById("confirmation-page");
const paymentPage = document.getElementById("payment-page");
const seatContainer = document.getElementById("seat-container");

// Utility Functions
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });
  document.getElementById(pageId).classList.remove("hidden");
}

function renderMovies() {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <button onclick="showMovieDetails(${movie.id})">Book Now</button>
    `;
    movieList.appendChild(movieCard);
  });
}

function showMovieDetails(movieId) {
  selectedMovie = movies.find((movie) => movie.id === movieId);
  const details = document.getElementById("movie-details-content");
  details.innerHTML = `
    <h2>${selectedMovie.title}</h2>
    <img src="${selectedMovie.poster}" alt="${selectedMovie.title}">
    <p>${selectedMovie.description}</p>
    <h3>Available Timings:</h3>
    <div id="timings">
      ${selectedMovie.timings
        .map(
          (time) => `<button onclick="selectTiming('${time}')">${time}</button>`
        )
        .join("")}
    </div>
  `;
  showPage("movie-details");
}

function selectTiming(timing) {
  selectedMovie.timing = timing;
  generateSeatLayout();
  showPage("booking-page");
}

function generateSeatLayout() {
  seatContainer.innerHTML = "";
  selectedSeats = [];
  for (let row = 0; row < 5; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";
    for (let col = 0; col < 8; col++) {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.onclick = () => toggleSeat(seat, row, col);
      rowDiv.appendChild(seat);
    }
    seatContainer.appendChild(rowDiv);
  }
}

function toggleSeat(seat, row, col) {
  const seatId = `${row}-${col}`;
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter((id) => id !== seatId);
  } else {
    seat.classList.add("selected");
    selectedSeats.push(seatId);
  }
}

function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  totalPrice = selectedSeats.length * selectedMovie.price.regular;
  document.getElementById("confirmation-content").innerHTML = `
    <h2>Booking Confirmed!</h2>
    <p><strong>Movie:</strong> ${selectedMovie.title}</p>
    <p><strong>Timing:</strong> ${selectedMovie.timing}</p>
    <p><strong>Seats:</strong> ${selectedSeats.join(", ")}</p>
    <p><strong>Total Price:</strong> $${totalPrice}</p>
    <button onclick="goToPayment()">Proceed to Payment</button>
  `;
  showPage("confirmation-page");
}

function goToPayment() {
  showPage("payment-page");
}

function processPayment() {
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;

  // Simple validation (you can expand this with more checks)
  if (!cardNumber || !expiryDate || !cvv) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate a successful payment
  alert("Payment Successful! Your booking is confirmed.");
  restartBooking();
}

function restartBooking() {
  selectedMovie = null;
  selectedSeats = [];
  showPage("homepage");
  renderMovies();
}

// Initial Render
renderMovies();
