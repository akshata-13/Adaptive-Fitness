// Access Firebase Realtime Database
const registerDB = firebase.database().ref('registrations');

// Function to handle form submission
function handleRegistrationFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Validate form data and save to Firebase
    if (name && email && phone && password) {
        registerDB.push({
            name: name,
            email: email,
            phone: phone,
            password: password
        }).then(() => {
            document.querySelector('.alert').style.display = 'block';
            // Clear the form fields
            document.getElementById('registerForm').reset();
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        document.getElementById('form-errors').textContent = 'All fields are required!';
    }
}

// Attach event listener
document.getElementById('registerForm').addEventListener('submit', handleRegistrationFormSubmit);
