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

// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Start listening automatically
recognition.start();

// Function to start speech recognition and handle results
function startRecognition() {
    recognition.start();
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log('Recognized:', transcript);

    if (transcript.includes('hello')) {
        speak('Hello! How can I assist you today? You can ask about workouts, services, or contact information.');
    } else if (transcript.includes('workout')) {
        window.location.hash = '#workouts';
        speak('Navigating to the workouts section. Here you can find various types of workouts.');
        setTimeout(() => {
            askForWorkoutType();
        }, 2000); // Delay to allow navigation to complete
    } else if (transcript.includes('services')) {
        window.location.hash = '#services';
        speak('Navigating to the services section. Here you can learn more about the services we offer.');
    } else if (transcript.includes('contact')) {
        window.location.hash = '#contact';
        speak('Navigating to the contact section. Here you can find our contact information.');
    } else {
        speak('Sorry, I did not understand that. Can you please repeat?');
    }

    // Restart recognition to continue listening
    startRecognition();
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    // Restart recognition in case of an error
    startRecognition();
};

// Function to speak text
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to ask for workout type
function askForWorkoutType() {
    speak('What type of workout are you interested in? You can say cardio, strength, or flexibility.');
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Workout type recognized:', transcript);
        provideWorkoutDetails(transcript);
        // Restart recognition to continue listening
        startRecognition();
    };
}

// Function to provide details about workout types
function provideWorkoutDetails(type) {
    const workouts = {
        cardio: 'Cardio workouts improve cardiovascular health. Examples include running, cycling, and swimming.',
        strength: 'Strength workouts build muscle and improve endurance. Examples include weightlifting and resistance exercises.',
        flexibility: 'Flexibility workouts improve range of motion and reduce injury risk. Examples include yoga and stretching.',
    };

    const details = workouts[type] || 'I\'m sorry, I don\'t have information about that type of workout.';
    speak(details);
}

// Use a single script to avoid redeclaration errors
let recognition = null;
let recognizing = false;

function startRecognition() {
  // Check if recognition is already running
  if (recognizing) {
    console.log('Speech recognition is already running.');
    return;
  }

  // Initialize recognition if not already initialized
  if (!recognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('SpeechRecognition not supported in this browser.');
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Set language if necessary
    recognition.interimResults = false;

    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('error', handleError);
    recognition.addEventListener('end', () => {
      recognizing = false;
    });
  }

  recognizing = true;
  recognition.start();
}

function handleResult(event) {
  // Handle recognition results
  console.log('Speech recognition result:', event.results[0][0].transcript);
}

function handleError(event) {
  console.error('Speech recognition error:', event.error);
  recognizing = false; // Reset recognizing flag on error
}

// Example: Start recognition on button click
document.getElementById('startRecognitionButton').addEventListener('click', startRecognition);

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
