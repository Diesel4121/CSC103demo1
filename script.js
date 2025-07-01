// This function runs once the entire HTML document has been loaded and parsed.
// It's a good practice to put your JavaScript code inside this to ensure
// all elements are available before you try to manipulate them.
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the HTML button element using its ID.
    // This allows us to add an event listener to it.
    const soundButton = document.getElementById('soundButton');
    const soundButton1 = document.getElementById('soundButton1');

    // Add an event listener to the stop sound button.
    soundButton1.addEventListener('click', () => {
        // Check if the audio is currently playing.
        // If it is, pause it and reset the current time to 0.
        const mySound = document.getElementById('mySound');
        if (!mySound.played) {
            // Pause the audio playback.
            if (mySound.paused) {
                MessageDisplay.innerHTML = "The sound is already paused.";
                ImageDisplay.src = "https://tse1.mm.bing.net/th/id/OIP.TwJlPYGz9nVautEDGyFAeQHaHa?pid=Api&P=0&h=220&w=220";
            }
            mySound.currentTime = 0; // Reset the playback time to the beginning.
            if (mySound.currentTime > 0) {
                // The sound has played for more than 0 seconds
                // Stop the music
                mySound.pause();
                mySound.currentTime = 0;
                console.log("Sound has played for more than 0 seconds. Music stopped.");
            }
        }
        mySound.pause();
    });

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

    const soundMessage = document.createElement('p');
    soundMessage.id = "soundMessage";
    document.querySelector('.container').insertBefore(soundMessage, document.querySelector('img'));

    const img = document.querySelector('img');
    const audio = document.getElementById('mySound');

    soundButton.addEventListener('click', function() {
        // Change text
        soundMessage.textContent = "The magic sound fills the air!";

        // Change image
        img.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=350&q=80";
        img.alt = "Magical Soundscape";

        // Play sound and show audio controls
        audio.style.display = "block";
    });
});