const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

// Helper function to check if the new position collides with existing entries
function checkCollision(newX, newY, entries) {
    const minDistance = 150; // Minimum distance between entries

    // Check if the new position collides with any existing entry
    for (let entry of entries) {
        const entryX = entry.x;
        const entryY = entry.y;
        const entryWidth = entry.element.offsetWidth;
        const entryHeight = entry.element.offsetHeight;

        // Check horizontal and vertical distances
        if (
            newX < entryX + entryWidth + minDistance &&
            newX + entryWidth + minDistance > entryX &&
            newY < entryY + entryHeight + minDistance &&
            newY + entryHeight + minDistance > entryY
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

        // Ensure images stay within the required height range
        img.onload = function () {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Calculate new height and width based on the image scaling
            let newHeight = Math.max(400, Math.min(800, height)); // Clamp height between 400px and 800px
            const scaleFactor = newHeight / height;
            const newWidth = width * scaleFactor;

            img.style.height = `${newHeight}px`;
            img.style.width = `${newWidth}px`;

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

        entry.appendChild(textBox);
    }

    // Randomly position the entry within the board and check for collisions
    let xPos, yPos;
    let collisionDetected = true;

    // Try until we find a non-colliding position
    while (collisionDetected) {
        xPos = Math.floor(Math.random() * (board.offsetWidth - entry.offsetWidth - 20)); // Random X position
        yPos = Math.floor(Math.random() * (board.offsetHeight - entry.offsetHeight - 20)); // Random Y position

        // Check if the new position collides with existing entries
        collisionDetected = checkCollision(xPos, yPos, entries);
    }

    // Store the position and the element for future collision checks
    entries.push({ x: xPos, y: yPos, element: entry });

    // Apply the calculated position to the entry
    entry.style.left = `${xPos}px`;
    entry.style.top = `${yPos}px`;

    // Add the entry to the board
    board.appendChild(entry);
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
