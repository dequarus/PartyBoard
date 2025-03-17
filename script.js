const gallery = document.getElementById("gallery");

let currentYPosition = 0; // Keep track of the vertical position

// Helper function to generate random positions
function getRandomPosition() {
    const maxWidth = window.innerWidth - 510;  // Ensure within screen width
    const maxHeight = currentYPosition + 500; // New entries push down the old ones
    const x = Math.floor(Math.random() * maxWidth);
    const y = Math.floor(Math.random() * maxHeight);

    return { x, y };
}

// Create new entry and append it to the gallery
function createEntry(imageUrl, text) {
    const entry = document.createElement("div");
    entry.classList.add("entry");

    const { x, y } = getRandomPosition();
    entry.style.left = `${x}px`;
    entry.style.top = `${y}px`;

    // If image is provided, create image element
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        entry.appendChild(img);
    }

    // If text is provided, create text box
    if (text) {
        const textBox = document.createElement("div");
        textBox.classList.add("text-box");
        const p = document.createElement("p");
        p.textContent = text;
        textBox.appendChild(p);
        entry.appendChild(textBox);
    }

    gallery.appendChild(entry);
    currentYPosition = y + 500;  // Increase the Y position after each new entry
}

// Example of how to use it: add a new entry manually
createEntry("https://via.placeholder.com/510", "This is an example text.");
createEntry("https://via.placeholder.com/510", "Another random text.");

// Simulate more entries every 3 seconds
setInterval(() => {
    createEntry("https://via.placeholder.com/510", "Another entry with randomized position!");
}, 3000);
