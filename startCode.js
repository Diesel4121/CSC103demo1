// Declare variables to hold references to HTML elements.
let startButton; // Reference to the "Start" button.
let stopButton;  // Reference to the "Stop" button.
let memeImage;   // Reference to the meme image element.

// Declare variables for animation control.
let intervalId;  // Stores the ID returned by setInterval, used to stop the animation.
let x = 0;       // Current X-coordinate (left position) of the meme image.
let y = 0;       // Current Y-coordinate (top position) of the meme image.
let dx = 2;      // Change in X-coordinate per frame (horizontal speed and direction).
let dy = 2;      // Change in Y-coordinate per frame (vertical speed and direction).
const speed = 2; // Base speed for movement.

/**
 * Function to initialize the game when the "Start" button is clicked.
 * It disables the Start button, enables the Stop button, and begins the meme's movement.
 */
function startGame() {
    // Disable the Start button to prevent multiple simultaneous animations.
    startButton.disabled = true;
    // Enable the Stop button so the user can stop the animation.
    stopButton.disabled = false;

    // Get the dimensions of the viewport (the visible area of the browser window).
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set initial random position for the meme image within the viewport.
    // Subtract memeImage.offsetWidth/Height to ensure the entire image is within bounds.
    x = Math.random() * (viewportWidth - memeImage.offsetWidth);
    y = Math.random() * (viewportHeight - memeImage.offsetHeight);

    // Set initial random direction (dx, dy) for the meme image.
    // dx and dy can be positive or negative, determining movement direction.
    dx = (Math.random() > 0.5 ? 1 : -1) * speed;
    dy = (Math.random() > 0.5 ? 1 : -1) * speed;

    // Apply the initial position to the meme image.
    memeImage.style.left = `${x}px`;
    memeImage.style.top = `${y}px`;

    // Start the animation interval.
    // The moveMeme function will be called repeatedly every 20 milliseconds.
    intervalId = setInterval(moveMeme, 20);
}

/**
 * Function to stop the game when the "Stop" button is clicked.
 * It disables the Stop button, enables the Start button, and clears the animation interval.
 */
function stopGame() {
    // Disable the Stop button as the animation is already stopped or stopping.
    stopButton.disabled = true;
    // Enable the Start button so the user can restart the animation.
    startButton.disabled = false;

    // Clear the interval, which stops the repeated calls to moveMeme.
    clearInterval(intervalId);
}

/**
 * Function to move the meme image around the screen.
 * This function is called repeatedly by setInterval.
 * It updates the image's position and handles boundary collisions.
 */
function moveMeme() {
    // Get the current dimensions of the viewport.
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Update the x and y coordinates based on the current direction (dx, dy).
    x += dx;
    y += dy;

    // Check for collision with the right or left boundaries.
    // If x goes beyond the right edge OR x goes below 0 (left edge).
    if (x + memeImage.offsetWidth > viewportWidth || x < 0) {
        // Reverse the horizontal direction (dx) to make the meme bounce.
        dx = -dx;
        // Adjust position to keep it within bounds immediately after collision.
        if (x < 0) x = 0;
        if (x + memeImage.offsetWidth > viewportWidth) x = viewportWidth - memeImage.offsetWidth;
    }

    // Check for collision with the bottom or top boundaries.
    // If y goes beyond the bottom edge OR y goes below 0 (top edge).
    if (y + memeImage.offsetHeight > viewportHeight || y < 0) {
        // Reverse the vertical direction (dy) to make the meme bounce.
        dy = -dy;
        // Adjust position to keep it within bounds immediately after collision.
        if (y < 0) y = 0;
        if (y + memeImage.offsetHeight > viewportHeight) y = viewportHeight - memeImage.offsetHeight;
    }

    // Apply the new calculated position to the meme image's style.
    // Use 'px' units for pixel positioning.
    memeImage.style.left = `${x}px`;
    memeImage.style.top = `${y}px`;
}

// This event listener ensures that the JavaScript code runs only after
// the entire HTML document has been completely loaded and parsed.
// This is crucial because it guarantees that elements like 'startButton',
// 'stopButton', and 'memeImage' exist in the DOM before we try to access them.
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements by their IDs.
    startButton = document.getElementById('startButton');
    stopButton = document.getElementById('stopButton');
    memeImage = document.getElementById('memeImage');

    // Add event listeners to the buttons.
    // When the 'startButton' is clicked, the 'startGame' function will be called.
    // We use addEventListener instead of onclick in HTML for better practice and to meet requirements.
    if (startButton) {
        startButton.addEventListener('click', startGame);
    } else {
        console.error("Error: 'startButton' element not found.");
    }

    // When the 'stopButton' is clicked, the 'stopGame' function will be called.
    if (stopButton) {
        stopButton.addEventListener('click', stopGame);
    } else {
        console.error("Error: 'stopButton' element not found.");
    }

    // Adjust initial position of the meme image to be within the viewport
    // once its dimensions are known (after image loads or DOM is ready).
    // This prevents it from starting off-screen if its initial CSS is not perfectly centered.
    if (memeImage) {
        // Recalculate initial x, y based on current viewport to ensure it starts visible.
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        x = (viewportWidth - memeImage.offsetWidth) / 2;
        y = (viewportHeight - memeImage.offsetHeight) / 2;
        memeImage.style.left = `${x}px`;
        memeImage.style.top = `${y}px`;
    }
});

// Optional: Add a resize event listener to adjust boundaries if the window size changes
// while the animation is running. This makes the bouncing more robust.
window.addEventListener('resize', () => {
    // If the game is currently running (intervalId is set), we might want to
    // re-evaluate boundaries or even restart the animation to adapt.
    // For simplicity, we just ensure the image stays within the new bounds.
    if (intervalId) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Ensure the image doesn't go out of bounds after resize
        if (x + memeImage.offsetWidth > viewportWidth) {
            x = viewportWidth - memeImage.offsetWidth;
            memeImage.style.left = `${x}px`;
        }
        if (y + memeImage.offsetHeight > viewportHeight) {
            y = viewportHeight - memeImage.offsetHeight;
            memeImage.style.top = `${y}px`;
        }
    }
});
