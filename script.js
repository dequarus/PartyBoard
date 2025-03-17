const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

// Function to generate random positions within the available space
function getRandomPosition() {
    const maxWidth = window.innerWidth - 530; // Subtracting 20px margin + entry width
    const maxHeight = window.innerHeight - 530; // Subtracting 20px margin + entry height
    const x = Math.floor(Math.random() * maxWidth);
    const y = Math.floor(Math.random() * maxHeight);
    return { x, y };
}

// Fetch data from Google Sheets
async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        // For each item in the data, create an entry
        data.forEach((item, index) => {
            createEntry(item.image1 || item.image2, item.text, index);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Create an entry for image and/or text
function createEntry(imageUrl, text, index) {
    const board = document.getElementById("board");

    // Create the entry container
    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Assign random position
    const { x, y } = getRandomPosition();
    entry.style.left = `${x}px`;
    entry.style.top = `${y}px`;

    // Add image if available
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;

        // Fetch image dimensions to maintain aspect ratio
        img.onload = function () {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Calculate the width based on scaling the image to 510px height
            const newWidth = (width * 510) / height;
            img.style.width = `${newWidth}px`;
            entry.appendChild(img);
        };
    }

    // Add text box if available
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.textContent = text;
        entry.appendChild(textBox);
    }

    // Append the new entry to the board
    board.appendChild(entry);
}

// Initialize and fetch the data
fetchData();
