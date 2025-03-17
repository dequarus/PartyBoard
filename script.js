// Replace with your Google Sheets API URL
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

// Function to calculate new width based on height and maintaining aspect ratio
function calculateWidth(originalWidth, originalHeight, targetHeight = 510) {
    return (originalWidth * targetHeight) / originalHeight;
}

// Fetch data from Google Sheets (Tally Form data)
async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        // Dynamically create entries for the board
        data.forEach(item => {
            createEntry(item.image1 || item.image2, item.text);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Create a new entry (image and/or text)
function createEntry(imageUrl, text) {
    const board = document.getElementById("board");

    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Add image if available
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;

        // Fetch the image to calculate its dimensions for scaling
        img.onload = function () {
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Calculate new width based on 510px height while maintaining aspect ratio
            const newWidth = calculateWidth(width, height);

            img.style.width = `${newWidth}px`;
            entry.appendChild(img);
        };
    }

    // Add text if available
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.textContent = text;
        entry.appendChild(textBox);
    }

    // Append the entry to the board
    board.appendChild(entry);
}

// Initialize the page with data
fetchData();
