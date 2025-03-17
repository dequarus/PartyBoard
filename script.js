// Replace with your Google Sheets API URL
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec";

let scrollAmount = 0;

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

    // Randomly decide whether image or text comes first
    const isImageFirst = Math.random() > 0.5;

    // Add image if available
    if (imageUrl && isImageFirst) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // Add text if available
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.textContent = text;
        entry.appendChild(textBox);
    }

    // Add image if available after text if image comes second
    if (imageUrl && !isImageFirst) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // Randomize position of entries
    const randomX = Math.floor(Math.random() * (window.innerWidth - 40)); // Random horizontal position
    const randomY = Math.floor(Math.random() * (window.innerHeight - 40)); // Random vertical position
    entry.style.transform = `translate(${randomX}px, ${randomY}px)`;

    board.appendChild(entry);
}

// Handle scrolling (move the board left and right with mouse scroll)
function handleScroll(event) {
    if (event.deltaY < 0) {
        scrollAmount += 20; // Scroll right when scrolling up
    } else {
        scrollAmount -= 20; // Scroll left when scrolling down
    }

    const maxScroll = document.getElementById("board").scrollWidth - window.innerWidth;
    if (scrollAmount < 0) scrollAmount = 0;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;

    document.getElementById("board").style.transform = `translateX(-${scrollAmount}px)`;
}

// Event listener for mouse wheel scroll
window.addEventListener('wheel', handleScroll, { passive: true });

// Initialize the page with data
fetchData();
