// Get references to the HTML elements by their IDs.
const secretAccessForm = document.getElementById('secretAccessForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const zipCodeInput = document.getElementById('zipCode');
const messageDisplay = document.getElementById('messageDisplay');

// Define the secret message.
const secretMessage = "Congratulations! You've unlocked the secret: 'Knowledge is the most powerful weapon.'";

// Set the onsubmit event handler for the form.
// This function will execute when the form is submitted.
secretAccessForm.onsubmit = function(event) {
    // Prevent the default form submission behavior, which would cause a page reload.
    event.preventDefault();

    // Clear any previous messages and styling from the display area.
    messageDisplay.innerHTML = '';
    messageDisplay.className = ''; // Remove any success/error classes.

    // Get the values from the input fields.
    const firstName = firstNameInput.value.trim(); // .trim() removes leading/trailing whitespace.
    const lastName = lastNameInput.value.trim();
    const zipCode = zipCodeInput.value.trim();

    // --- Validate Full Name Length ---
    // Combine first name, a space, and last name into a single string.
    const fullName = firstName + " " + lastName;
    // Check if the combined full name has more than 20 characters.
    if (fullName.length > 20) {
        // If invalid, display an error message using innerHTML.
        messageDisplay.innerHTML = '<span class="error-message">Error: Full name must be 20 characters or less.</span>';
        // Stop the function execution if validation fails.
        return;
    }

    // --- Validate Zip Code Format ---
    // Check if the zip code contains exactly 5 digits.
    // The regular expression /^\d{5}$/ means:
    // ^   - start of the string
    // \d  - any digit (0-9)
    // {5} - exactly 5 occurrences of the preceding character (\d)
    // $   - end of the string
    if (!/^\d{5}$/.test(zipCode)) {
        // If invalid, display an error message using innerHTML.
        messageDisplay.innerHTML = '<span class="error-message">Error: Zip code must be 5 digits.</span>';
        // Stop the function execution if validation fails.
        return;
    }

    // --- If all inputs are valid, display the secret message ---
    // Set the innerHTML of the message display to the secret message.
    messageDisplay.innerHTML = '<span class="success-message">' + secretMessage + '</span>';
    // Add a success class for specific styling (e.g., green text).
    messageDisplay.classList.add('success-message');
};
