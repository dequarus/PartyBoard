const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec"; // Replace with actual sheet URL

let currentPositionY = 0; // This will track the vertical position of the newest entry

async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        // Check the data we're receiving from the API
        console.log("Fetched Data:", data);

        if (!data || data.length === 0) {
            console.log("No data found.");
            return;
        }

        // Add new entries from the data
        data.forEach(item => {
            createEntry(item.image1 || item.image2, item.text);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createEntry(imageUrl, text) {
    const board = document.getElementById("board");

    // Ensure there is an image URL or text
    if (!imageUrl && !text) {
        console.log("No image or text provided, skipping entry.");
        return;
    }

    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Create image element if image URL is provided
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // Create text element if text is provided
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        const p = document.createElement("p");
        p.textContent = text;
        textBox.appendChild(p);
        entry.appendChild(textBox);
    }

    // Set the position of the new entry
    entry.style.top = `${currentPositionY}px`;

    // Update the Y position for the next entry
    currentPositionY += 540; // Add space for the next entry (image or text) and margin

    // Append the entry to the board
    board.appendChild(entry);
}

// Fetch data on page load
fetchData();

// Set up regular refresh every 5 seconds
setInterval(fetchData, 5000);
