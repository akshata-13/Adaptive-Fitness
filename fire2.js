// Access Firebase Realtime Database
const contactformDB = firebase.database().ref('contactform');

// Function to handle form submission
function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('emailid').value;
    const phone = document.getElementById('phoneno').value;
    const message = document.getElementById('message').value;

    // Validate form data and save to Firebase
    if (name && email && phone && message) {
        contactformDB.push({
            name: name,
            email: email,
            phone: phone,
            message: message
        }).then(() => {
            document.querySelector('.alert').style.display = 'block';
            // Clear the form fields
            document.getElementById('contactForm').reset();
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        document.getElementById('error-message').textContent = 'All fields are required!';
    }
}

// Attach event listener
document.getElementById('contactForm').addEventListener('submit', handleContactFormSubmit);
