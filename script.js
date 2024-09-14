let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.workouts .slider');
    const totalSlides = slides.children.length;
    const slideWidth = document.querySelector('.workouts .box').offsetWidth + 30; // Width of slide plus margin
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    slides.style.transform = `translateX(${-index * slideWidth}px)`;
    currentIndex = index;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Optional: Auto-slide functionality
setInterval(nextSlide, 10000); 

//////////////////////////////////////////////////////////
//voice
// Initialize Speech Recognition and Synthesis
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Function to start speech recognition
function startRecognition() {
  recognition.start();
}

// Handle speech results
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log('Command received:', command);

  // Respond and navigate based on command
  processCommand(command);

  // Restart recognition to listen for further commands
  startRecognition();
};

// Function to process commands
function processCommand(command) {
  if (command.includes('hello')) {
    respond('Hello! How can I assist you today?');
  } else if (command.includes('workout')) {
    handleWorkoutCommand(command);
  } else if (command.includes('stop')) {
    respond('Goodbye!');
    recognition.stop(); // Stop listening
  } else {
    respond('Sorry, I did not understand that.');
  }
}

// Respond to the user
function respond(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-IN'; // Use English (India) voice
  synth.speak(utterance);
}

// Handle workout commands
function handleWorkoutCommand(command) {
  if (command.includes('cardio')) {
    window.location.href = '#workout-cardio'; // Replace with actual link
    respond('Taking you to the seated cardio workout.');
  } else if (command.includes('strength')) {
    window.location.href = '#workout-strength'; // Replace with actual link
    respond('Taking you to the seated strength training workout.');
  } else if (command.includes('yoga')) {
    window.location.href = '#workout-yoga'; // Replace with actual link
    respond('Taking you to the adaptive yoga workout.');
  } else {
    respond('Sorry, I could not find that workout.');
  }
}

// Start listening when the voice assistant button is clicked
document.getElementById('voice-assistant-btn').addEventListener('click', startRecognition);

// Handle errors
recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};



//////////////////////////////////////////////////////////

function validateForm() {
    // Clear previous error messages
    clearErrors();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // Validate full name (must be at least 2 characters)
    if (fullName.length < 2) {
        showError('nameError', 'Full name must be at least 2 characters long.');
        isValid = false;
    }

    // Validate email using regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate phone number (must be a 10-digit number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters long.');
        isValid = false;
    }

    // Validate confirm password (must match password)
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match.');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function clearErrors() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('phoneError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';
}

///////////////////////////////////////////////

document.getElementById('contactForm').addEventListener('submit', function (e) {
    let isValid = true;
    let errorMessage = '';
  
    // Validate Name
    const name = document.getElementById('name').value;
    if (name.length < 3) {
      errorMessage += 'Name must be at least 3 characters long.<br>';
      isValid = false;
    }
  
    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      errorMessage += 'Please enter a valid email address.<br>';
      isValid = false;
    }
  
    // Validate Phone Number
    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      errorMessage += 'Phone number must be 10 digits.<br>';
      isValid = false;
    }
  
    // Validate Subject
    const subject = document.getElementById('subject').value;
    if (subject === '') {
      errorMessage += 'Subject is required.<br>';
      isValid = false;
    }
  
    // Validate Message
    const message = document.getElementById('message').value;
    if (message.length < 10) {
      errorMessage += 'Message must be at least 10 characters long.<br>';
      isValid = false;
    }
  
    // If form is invalid, prevent submission and show error messages
    if (!isValid) {
      e.preventDefault();
      document.getElementById('error-message').innerHTML = errorMessage;
    }
  });

//////////////////////////////////////////////////////
// Initialize an empty array to store activity data
let activities = [];

// Handle form submission for logging activity
document.getElementById('activityForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form values
  const activityDate = document.getElementById('activityDate').value;
  const activityType = document.getElementById('activityType').value;
  const activityDuration = document.getElementById('activityDuration').value;

  // Create an activity object
  const activity = {
    date: activityDate,
    type: activityType,
    duration: parseInt(activityDuration),
  };

  // Add activity to the array
  activities.push(activity);

  // Store activities in localStorage
  localStorage.setItem('activities', JSON.stringify(activities));

  // Show success message
  document.querySelector('.alert').style.display = 'block';
  setTimeout(() => {
    document.querySelector('.alert').style.display = 'none';
  }, 2000);

  // Update progress chart
  updateChart();
  calculateTotalDuration();
});

// Retrieve activities from localStorage on page load
window.onload = function () {
  const storedActivities = JSON.parse(localStorage.getItem('activities'));
  if (storedActivities) {
    activities = storedActivities;
    updateChart();
    calculateTotalDuration();
  }
};

// Function to update the chart
function updateChart() {
  const activityDates = activities.map(a => a.date);
  const activityDurations = activities.map(a => a.duration);

  const ctx = document.getElementById('activityChart').getContext('2d');
  const activityChart = new Chart(ctx, {
    type: 'bar', // Choose bar or line chart
    data: {
      labels: activityDates,
      datasets: [{
        label: 'Activity Duration (minutes)',
        data: activityDurations,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              const index = tooltipItem.dataIndex;
              const activity = activities[index]; // Get the activity data for the current index
              return `Workout: ${activity.type}, Duration: ${activity.duration} minutes`;
            }
          }
        }
      }
    }
  });
}

// Function to calculate total duration of all activities
function calculateTotalDuration() {
  let totalDuration = activities.reduce((total, activity) => total + activity.duration, 0);
  document.getElementById('totalDuration').textContent = `Total Activity Duration: ${totalDuration} minutes`;
}

// Call this function after logging activity to update the progress
updateChart();
calculateTotalDuration();
