const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

// Helper function to check if the new position collides with existing entries
function checkCollision(newX, newY, entries, entry) {
    const minDistance = 150; // Minimum distance between entries

    // Check if the new position collides with any existing entry
    for (let existingEntry of entries) {
        const existingX = existingEntry.x;
        const existingY = existingEntry.y;
        const existingWidth = existingEntry.element.offsetWidth;
        const existingHeight = existingEntry.element.offsetHeight;

        // Check horizontal and vertical distances
        if (
            newX < existingX + existingWidth + minDistance &&
            newX + entry.offsetWidth + minDistance > existingX &&
            newY < existingY + existingHeight + minDistance &&
            newY + entry.offsetHeight + minDistance > existingY
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

// Function to create the image and/or text entry
function createEntry(imageUrl, text, isText, entries) {
    const board = document.getElementById("board");

    // Create the entry container
    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Add image if available and if it's not a text submission
    if (!isText && imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;

        // Ensure images scale to 510px height while maintaining the original width-to-height ratio
        img.onload = function () {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Calculate new height and width based on the image scaling (height 510px)
            const scaleFactor = 510 / height;
            const newWidth = width * scaleFactor;

            img.style.height = "510px";
            img.style.width = `${newWidth}px`; // Scale the width proportionally to the height

            entry.appendChild(img);
        };
    }

    // Add text box if available
    if (isText && text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");

        // Add text content inside the box
        const textParagraph = document.createElement("p");
        textParagraph.textContent = text;
        textBox.appendChild(textParagraph);

        // Style the text box with fixed width and dynamic height
        textBox.style.width = "510px"; // Fixed width
        textBox.style.wordWrap = "break-word"; // Ensure text wraps
        textBox.style.padding = "10px"; // Add padding for spacing inside text box
        textBox.style.boxSizing = "border-box"; // Include padding in the width calculation

        // Dynamically adjust the height based on the text content
        textBox.style.height = "auto"; // Allow the height to grow based on content
        textBox.style.maxHeight = "510px"; // Maximum height of 510px

        entry.appendChild(textBox);
    }

    // Randomly position the entry within the board and check for collisions
    let xPos, yPos;
    let collisionDetected = true;

    // Try until we find a non-colliding position
    while (collisionDetected) {
        xPos = Math.floor(Math.random() * (board.offsetWidth - entry.offsetWidth - 20)); // Random X position
        yPos = board.scrollHeight; // Place entry at the bottom (start of the new page)

        // Check if the new position collides with existing entries
        collisionDetected = checkCollision(xPos, yPos, entries, entry);
    }

    // Store the position and the element for future collision checks
    entries.push({ x: xPos, y: yPos, element: entry });

    // Apply the calculated position to the entry
    entry.style.left = `${xPos}px`;
    entry.style.top = `${yPos}px`;

    // Add the entry to the board
    board.appendChild(entry);

    // Add space for next submission by expanding the page by 1080px (vertical scroll)
    document.body.style.height = `${document.body.scrollHeight + 1080}px`;
}

// Function to fetch data from the Google Sheet
async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        const entries = [];

        // For each item in the data, create an entry
        data.forEach((item) => {
            // If an image is provided, create image entry
            if (item.image1 || item.image2) {
                createEntry(item.image1 || item.image2, null, false, entries);
            }
            // If text is provided, create text entry
            if (item.text) {
                createEntry(null, item.text, true, entries);
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Initialize and fetch the data when the page loads
fetchData();
