// Example URL, replace with your actual Google Sheets API URL
const SHEET_API_URL = "YOUR_GOOGLE_SHEET_API_URL"; 

let currentYPosition = 0;
let usedPositions = [];  // Store positions to prevent overlap

const boardWidth = window.innerWidth;
const boardHeight = window.innerHeight;
const entryWidth = 510;
const entryHeight = 510;  // Set a fixed height for entries

async function fetchData() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();

        if (!data || data.length === 0) {
            console.log("No data found.");
            return;
        }

        // Process each new entry
        data.forEach(item => {
            createEntry(item.image1 || item.image2, item.text);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function getRandomPosition() {
    let x, y;
    // Ensure the random position is within the horizontal and vertical bounds of the screen
    do {
        x = Math.floor(Math.random() * (boardWidth - entryWidth));
        y = currentYPosition + Math.floor(Math.random() * 500); // Ensure new submissions push down
    } while (isOverlapping(x, y));

    usedPositions.push({ x, y });
    return { x, y };
}

function isOverlapping(x, y) {
    // Check if the new position overlaps any previous entries
    for (let i = 0; i < usedPositions.length; i++) {
        const pos = usedPositions[i];
        if (Math.abs(x - pos.x) < entryWidth && Math.abs(y - pos.y) < entryHeight) {
            return true;  // Overlap detected
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

    // Get a random position for the new entry
    const { x, y } = getRandomPosition();

    // Apply the random position to the entry
    entry.style.left = `${x}px`;
    entry.style.top = `${y}px`;

    // Add image element if image URL exists
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // Add text element if text exists
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        const p = document.createElement("p");
        p.textContent = text;
        textBox.appendChild(p);
        entry.appendChild(textBox);
    }

    // Append the new entry to the board
    board.appendChild(entry);

    // Update the currentYPosition so that new entries appear lower down
    currentYPosition = y + 500;  // Adjust this if you need more or less vertical spacing
}

// Initialize by fetching data
fetchData();

// Fetch new data periodically (e.g., every 5 seconds)
setInterval(fetchData, 5000);
