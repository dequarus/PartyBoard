const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec"; // Replace with actual sheet URL

let usedPositions = []; // To track used positions for entries

const boardWidth = window.innerWidth;
const boardHeight = window.innerHeight;
const entryWidth = 510; // Fixed width for each entry
const entryHeight = 510; // Max height for entries (images will scale to fit)

async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

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

function getRandomPosition() {
    let x, y;
    // Ensure the random position stays within the bounds of the screen and doesn't overlap with other entries
    do {
        x = Math.floor(Math.random() * (boardWidth - entryWidth)); // Random horizontal position
        y = Math.floor(Math.random() * (boardHeight - entryHeight)); // Random vertical position
    } while (isOverlapping(x, y)); // Check if the new position overlaps with existing entries

    usedPositions.push({ x, y }); // Store the position to avoid future overlap
    return { x, y };
}

function isOverlapping(x, y) {
    // Check if a given position overlaps with any used positions
    for (let i = 0; i < usedPositions.length; i++) {
        const pos = usedPositions[i];
        if (Math.abs(x - pos.x) < entryWidth && Math.abs(y - pos.y) < entryHeight) {
            return true;
        }
    }
    return false;
}

function createEntry(imageUrl, text) {
    const board = document.getElementById("board");

    if (!imageUrl && !text) {
        console.log("No image or text provided, skipping entry.");
        return;
    }

    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Get a random position for the entry
    const { x, y } = getRandomPosition();

    // Set the random position
    entry.style.left = `${x}px`;
    entry.style.top = `${y}px`;

    // Create image element if image URL is provided
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // Create text element if text is provided
    if (text) {
    
