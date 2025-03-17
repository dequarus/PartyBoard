const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec"; // Replace with actual sheet URL

let currentPositionY = 0; // Track vertical position for new entries

async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        // Check the fetched data
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

    // Add the entry to the board
    board.appendChild(entry);
}

// Fetch data on page load
fetchData();

// Set up regular refresh every 5 seconds
setInterval(fetchData, 5000);
