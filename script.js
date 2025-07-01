// This function runs once the entire HTML document has been loaded and parsed.
// It's a good practice to put your JavaScript code inside this to ensure
// all elements are available before you try to manipulate them.
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the HTML button element using its ID.
    // This allows us to add an event listener to it.
    const soundButton = document.getElementById('soundButton');

    // Get a reference to the HTML audio element using its ID.
    // This allows us to control the audio playback.
    const mySound = document.getElementById('mySound');

    // Add an event listener to the sound button.
    // When the button is clicked, the function provided as the second argument will execute.
    soundButton.addEventListener('click', () => {
        // First, check if the audio is currently playing.
        // If it is, we want to reset it to the beginning before playing again.
        // This prevents multiple overlaps if the button is clicked rapidly.
        if (!mySound.paused) {
            // Set the current playback time back to 0 (the beginning of the sound).
            mySound.currentTime = 0;
        }
        // Play the audio. This method starts the sound from its current time (or 0 if reset).
        mySound.play()
            // The .play() method returns a Promise. We use .catch() to handle potential errors,
            // such as the user's browser preventing autoplay without interaction.
            .catch(error => {
                // Log any errors to the console for debugging purposes.
                console.error("Error playing sound:", error);
                // Optionally, you could display a user-friendly message on the page
                // if the sound couldn't be played (e.g., "Sound playback blocked by browser.").
                // For example: alert("Sound playback blocked. Please interact with the page first.");
            });
    });
});