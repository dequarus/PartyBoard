const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz8eoEFxQlwSjXu4RDww8XEXPrb7dr3EtstrJy-gVoiFp6s3lgvzJZ-bbonekFYHIo/exec"; // Replace with your Google Sheets API URL

let scrollAmount = 0;

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

function createEntry(imageUrl, text) {
    const board = document.getElementById("board");

    const entry = document.createElement("div");
    entry.classList.add("entry");

    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.textContent = text;

        // Allow text to expand beyond 4 lines if needed
        if (textBox.clientHeight > 100) {
            textBox.classList.add("expanded");
        }

        entry.appendChild(textBox);
    }

    board.appendChild(entry);
}

function handleScroll(event) {
    // Adjust scroll direction based on mouse wheel scroll
    if (event.deltaY < 0) {
        scrollAmount += 20; // Scroll right when scrolling up
    } else {
        scrollAmount -= 20; // Scroll left when scrolling down
    }

    // Prevent scrolling past the start or end
    if (scrollAmount < 0) scrollAmount = 0;
    if (scrollAmount > document.getElementById("board").scrollWidth - window.innerWidth) {
        scrollAmount = document.getElementById("board").scrollWidth - window.innerWidth;
    }

    // Apply scrolling to board
    document.getElementById("board").style.transform = `translateX(-${scrollAmount}px)`;
}

// Event listener for scroll
window.addEventListener('wheel', handleScroll, { passive: true });

// Initialize the page with data
fetchData();
