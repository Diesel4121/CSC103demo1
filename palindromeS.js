// Get references to HTML elements by their IDs.
const palindromeForm = document.getElementById('palindromeForm'); // The main form for input.
const phraseInput = document.getElementById('phraseInput');     // The text input field.
const resultDisplay = document.getElementById('resultDisplay'); // Area to display results.
const submitButton = document.getElementById('submitButton');   // The button to check palindrome.
const actionButtons = document.getElementById('actionButtons'); // Container for "Check Another" and "Done" buttons.
const checkAnotherButton = document.getElementById('checkAnotherButton'); // "Check Another Word" button.
const doneButton = document.getElementById('doneButton');       // "Done" button.
const sessionEndMessage = document.getElementById('sessionEndMessage'); // Message for session end.

/**
 * Checks if a given string is a palindrome.
 * It first cleans the string by removing spaces and converting to lowercase,
 * then compares the cleaned string with its reversed version.
 * @param {string} str The input string to check.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 */
function isPalindrome(str) {
    // Convert the string to lowercase to ensure case-insensitive comparison.
    // Remove all non-alphanumeric characters (including spaces, punctuation) using a regex.
    // The regex /[^a-z0-9]/g matches any character that is NOT a lowercase letter or a digit, globally.
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Reverse the cleaned string.
    // .split('') converts the string into an array of characters.
    // .reverse() reverses the order of elements in the array.
    // .join('') joins the array elements back into a string.
    const reversedStr = cleanedStr.split('').reverse().join('');

    // Compare the cleaned original string with the reversed string.
    // If they are identical, the original string is a palindrome.
    return cleanedStr === reversedStr;
}

/**
 * Handles the form submission event.
 * It retrieves the user's input, checks if it's a palindrome, and displays the result.
 * It also manages the visibility of the action buttons.
 * @param {Event} event The form submission event object.
 */
function handleSubmit(event) {
    // Prevent the default form submission behavior, which would cause a page reload.
    event.preventDefault();

    // Get the value from the phrase input field and trim any leading/trailing whitespace.
    const inputPhrase = phraseInput.value.trim();

    // Check if the input phrase is empty.
    if (inputPhrase === '') {
        // If empty, display a validation message using innerHTML.
        resultDisplay.innerHTML = '<span class="not-palindrome-message">Please enter a word or phrase to check.</span>';
        // Hide the action buttons as there's no valid result yet.
        actionButtons.style.display = 'none';
        return; // Stop the function execution.
    }

    // Perform the palindrome check using the isPalindrome function.
    const palindromeResult = isPalindrome(inputPhrase);

    // Prepare the message to display based on the palindrome check result.
    let message = '';
    let messageClass = ''; // To apply specific styling (green for palindrome, red for not).

    if (palindromeResult) {
        // If it's a palindrome.
        message = `"${inputPhrase}" is a PALINDROME!`;
        messageClass = 'palindrome-message';
    } else {
        // If it's not a palindrome.
        message = `"${inputPhrase}" is NOT a palindrome.`;
        messageClass = 'not-palindrome-message';
    }

    // Update the result display area with the message and apply the appropriate styling class.
    resultDisplay.innerHTML = `<p>${message}</p>`;
    resultDisplay.className = messageClass; // Overwrite previous classes.

    // Show the action buttons ("Check Another Word", "Done") after a result is displayed.
    actionButtons.style.display = 'flex'; // Use flex to display buttons side-by-side.
    submitButton.style.display = 'none'; // Hide the submit button after first check.
}

/**
 * Resets the form and result display to allow the user to enter another word.
 * It clears the input field and result area, and manages button visibility.
 */
function handleCheckAnother() {
    // Clear the input field.
    phraseInput.value = '';
    // Reset the result display area.
    resultDisplay.innerHTML = 'Enter text and click "Check Palindrome".';
    resultDisplay.className = ''; // Remove any previous styling classes.
    // Hide the action buttons.
    actionButtons.style.display = 'none';
    // Show the submit button again.
    submitButton.style.display = 'block'; // Or 'flex' if it was flex.
    // Focus on the input field for easy re-entry.
    phraseInput.focus();
}

/**
 * Ends the palindrome checking session.
 * It hides the form and buttons, and displays a thank you message.
 */
function handleDone() {
    // Hide the main form.
    palindromeForm.style.display = 'none';
    // Hide the result display.
    resultDisplay.style.display = 'none';
    // Hide the action buttons.
    actionButtons.style.display = 'none';
    // Display the session end message.
    sessionEndMessage.style.display = 'block'; // Show the thank you message.
}

// Event listener to ensure the JavaScript runs after the HTML is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Attach the handleSubmit function to the form's 'submit' event.
    // This is the primary way to handle form submissions without using 'onclick' in HTML.
    if (palindromeForm) {
        palindromeForm.addEventListener('submit', handleSubmit);
    } else {
        console.error("Error: 'palindromeForm' element not found.");
    }

    // Attach the handleCheckAnother function to the "Check Another Word" button's 'click' event.
    if (checkAnotherButton) {
        checkAnotherButton.addEventListener('click', handleCheckAnother);
    } else {
        console.error("Error: 'checkAnotherButton' element not found.");
    }

    // Attach the handleDone function to the "Done" button's 'click' event.
    if (doneButton) {
        doneButton.addEventListener('click', handleDone);
    } else {
        console.error("Error: 'doneButton' element not found.");
    }
});
