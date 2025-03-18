const SHEET_URL = "YOUR_GOOGLE_SHEETS_JSON_URL"; // Replace with actual Google Sheets JSON URL
const gallery = document.getElementById("gallery");

let currentBottom = 0; // Track the bottom of the gallery for new entries

async function fetchSubmissions() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const entries = data.values.slice(1); // Skip header row

        gallery.innerHTML = ""; // Clear old content

        let usedPositions = []; // Prevent overlap

        entries.forEach((entry, index) => {
            const imgUrl = entry[3] || entry[4]; // Image URLs from columns D or E
            const text = entry[5]; // Text submission from column F
            const yOffset = index * 600; // Ensure new entries go lower

            let xPos, yPos;
            let attempts = 0;

            // Ensure no overlap (min 150px spacing)
            do {
                xPos = Math.floor(Math.random() * (1920 - 600)); // Random X (leave margin)
                yPos = currentBottom + Math.floor(Math.random() * 300) + yOffset; // Random Y
                attempts++;
            } while (usedPositions.some(pos => Math.abs(pos.x - xPos) < 150 && Math.abs(pos.y - yPos) < 150) && attempts < 10);

            usedPositions.push({ x: xPos, y: yPos });

            let itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
            itemDiv.style.left = `${xPos}px`;
            itemDiv.style.top = `${yPos}px`;

            if (imgUrl) {
                let img = document.createElement("img");
                img.src = imgUrl;
                itemDiv.appendChild(img);
            } 
            if (text) {
                let textDiv = document.createElement("div");
                textDiv.classList.add("text-box");
                textDiv.textContent = text;
                itemDiv.appendChild(textDiv);
            }

            gallery.appendChild(itemDiv);
        });

        // Increase bottom for more space when scrolling
        currentBottom += 1080;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data initially and refresh every 30 seconds for new entries
fetchSubmissions();
setInterval(fetchSubmissions, 30000);
