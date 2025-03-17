const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

// Function to create the image and/or text entry
function createEntry(imageUrl, text) {
    const board = document.getElementById("board");

    // Create the entry container
    const entry = document.createElement("div");
    entry.classList.add("entry");

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

        // Add text content inside the box
        const textParagraph = document.createElement("p");
        textParagraph.textContent = text;
        textBox.appendChild(textParagraph);

        entry.appendChild(textBox);
    }

    // Append the new entry to the board
    board.appendChild(entry);
}

// Function to fetch data from the Google Sheet
async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        // For each item in the data, create an entry
        data.forEach((item) => {
            createEntry(item.image1 || item.image2, item.text);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Initialize and fetch the data when the page loads
fetchData();
