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

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

// Configure speech recognition
recognition.continuous = true;
recognition.interimResults = false;

// Start recognition on button click
document.getElementById('voice-assistant-btn').addEventListener('click', () => {
    recognition.start();
});

// Handle results from speech recognition
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log('Recognized speech:', transcript);

    if (transcript.includes('hello')) {
        speak('Hello! How can I assist you today?');
    } else if (transcript.includes('workout')) {
        navigateTo('workouts');
    } else if (transcript.includes('services')) {
        navigateTo('services');
    } else if (transcript.includes('contact')) {
        navigateTo('contact');
    } else {
        speak('Sorry, I did not understand that. Please say "workout", "services", or "contact".');
    }
};

// Handle errors
recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

// Restart recognition automatically
recognition.onend = () => {
    recognition.start();
};

// Function to navigate to a section
function navigateTo(section) {
    const element = document.querySelector(`a[href="#${section}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        speak(`Navigating to ${section}.`);
    } else {
        speak('Section not found.');
    }
}

// Function to handle text-to-speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust rate if needed
    synth.speak(utterance);
}
