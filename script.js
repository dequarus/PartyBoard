const gallery = document.getElementById('gallery');

// Keeps track of the Y position for new entries to avoid overlap.
let currentYPosition = 0;

// Helper function to generate random positions within the screen
function getRandomPosition() {
    const maxWidth = window.innerWidth - 510;  // Keep it within the screen width
    const maxHeight = currentYPosition + 500;  // Allow scrolling to add more entries vertically
    const x = Math.floor(Math.random() * maxWidth);
    const y = Math.floor(Math.random() * maxHeight);

    return { x, y };
}

// Function to create and add a new entry to the gallery
function createEntry(imageUrl, text) {
    const entry = document.createElement('div');
    entry.classList.add('entry');

    const { x, y } = getRandomPosition();
    entry.style.left = `${x}px`;  // Set the X position randomly
    entry.style.top = `${y}px`;   // Set the Y position randomly

    // If image URL is provided, create an image element
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // If text is provided, create a text box
    if (text) {
        const textBox = document.createElement('div');
        textBox.classList.add('text-box');
        const p = document.createElement('p');
        p.textContent = text;
        textBox.appendChild(p);
        entry.appendChild(textBox);
    }

    gallery.appendChild(entry);  // Add the entry to the gallery

    currentYPosition = y + 500;  // Update the Y position for the next entry
}

// Simulating new entries: add one every 3 seconds for testing
setInterval(() => {
    createEntry("https://via.placeholder.com/510", "This is a random text entry!");
}, 3000);

// Create initial entries manually
createEntry("https://via.placeholder.com/510", "Initial random entry!");
createEntry("https://via.placeholder.com/510", "Another random entry!");
