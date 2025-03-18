const SHEET_URL = "YOUR_GOOGLE_SHEETS_JSON_URL"; // Replace with actual Google Sheets JSON URL
const gridContainer = document.getElementById("grid-container");

async function fetchSubmissions() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const entries = data.values.slice(1); // Skip header row

        gridContainer.innerHTML = ""; // Clear old content

        entries.forEach((entry) => {
            const imgUrl = entry[3] || entry[4]; // Image URLs from columns D or E
            const text = entry[5]; // Text submission from column F

            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            if (imgUrl) {
                let img = document.createElement("img");
                img.src = imgUrl;
                gridItem.appendChild(img);
            } 
            if (text) {
                let textDiv = document.createElement("div");
                textDiv.classList.add("text-box");
                textDiv.textContent = text;
                gridItem.appendChild(textDiv);
            }

            gridContainer.appendChild(gridItem);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data initially and refresh every 30 seconds for new entries
fetchSubmissions();
setInterval(fetchSubmissions, 30000);
