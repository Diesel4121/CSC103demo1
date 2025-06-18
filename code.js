const messages = {
            flipResult: "The coin landed on: ",
            userChose: "You chose: ",
            win: "You win!",
            lose: "You lose!",
            heads: "Heads", // Kept for internal logic/comparison
            tails: "Tails", // Kept for internal logic/comparison
            headsExclam: "Heads!", // Added for use with functions returning "Heads!"
            tailsExclam: "Tails!", // Added for use with functions returning "Tails!"
            jsAwesome: "JavaScript is awesome!" // Added for the heading update example
        };

        // Get references to HTML elements by their IDs
        const gameForm = document.getElementById('gameForm');
        const userChoiceSelect = document.getElementById('userChoice');
        const resultDisplay = document.getElementById('resultDisplay');
        const headingElement = document.getElementById('heading'); // Get reference to the heading

        // Example function using a new message from JSON (not part of game logic flow)
        // You could call this function from a button or other event if needed.
        /*
        function updateHeadingText() {
            if (headingElement) {
                headingElement.innerHTML = messages.jsAwesome;
            }
        }
        */

        // Set the onsubmit event handler for the form.
        // This function runs when the form is submitted.
        gameForm.onsubmit = function(event) {
            // Prevent the default form submission behavior (page reload)
            event.preventDefault();

            // Clear any previous results
            resultDisplay.innerHTML = '';

            // Get the user's selected choice from the dropdown
            const userSelection = userChoiceSelect.value; // Will be "heads" or "tails"

            // Simulate a coin flip: 0 for Heads, 1 for Tails
            const coinFlipResult = Math.floor(Math.random() * 2); // Generates 0 or 1

            let actualOutcome = '';
            // Use the base 'Heads'/'Tails' for the internal logic
            if (coinFlipResult === 0) {
                actualOutcome = messages.heads;
            } else {
                actualOutcome = messages.tails;
            }

            // Compare user's choice with the actual coin flip result
            let gameOutcomeMessage = '';
            // Check if user's selection matches the actual outcome (converted to lowercase for robust comparison)
            if (userSelection === actualOutcome.toLowerCase()) {
                gameOutcomeMessage = messages.win;
            } else {
                gameOutcomeMessage = messages.lose;
            }

            // Determine the displayed outcome (you could choose to use headsExclam/tailsExclam here if desired)
            let displayedOutcome = actualOutcome; // Default to 'Heads' or 'Tails'
            /*
            // If you wanted to use "Heads!" or "Tails!" for display:
            if (actualOutcome === messages.heads) {
                displayedOutcome = messages.headsExclam;
            } else {
                displayedOutcome = messages.tailsExclam;
            }
            */

            // Display all the results using innerHTML
            resultDisplay.innerHTML = `
                <p>${messages.userChose} <strong>${userSelection.charAt(0).toUpperCase() + userSelection.slice(1)}</strong></p>
                <p>${messages.flipResult} <strong>${displayedOutcome}</strong></p>
                <p><strong>${gameOutcomeMessage}</strong></p>
            `;
        };