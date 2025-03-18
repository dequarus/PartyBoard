const SHEET_URL = "YOUR_GOOGLE_SHEETS_JSON_URL"; // Replace with your Sheets JSON URL
const gallery = document.getElementById("gallery");
const columns = [[], [], [], []]; // Four columns

// Fetch submissions and update the board
async function fetchSubmissions() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const entries = data.values.slice(1); // Skip header row

        // Clear columns before reloading data
        columns.forEach(col => col.length = 0);
        gallery.innerHTML = ""; 

        entries.forEach((entry, index) => {
            const imgUrl = entry[3] || entry[4]; // Image URLs from columns D or E
            const text = entry[5]; // Text submission from column F

            // Alternate placing between the four columns
            const columnIndex = index % 4;
            const column = columns[columnIndex];

            if (imgUrl) {
                column.push(`<div><img src="${imgUrl}" loading="lazy"></div>`);
            } 
            if (text) {
                column.push(`<div class="text-box">${text}</div>`);
            }
        });

        // Render all columns dynamically
        columns.forEach((colEntries, i) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("column");
            columnDiv.innerHTML = colEntries.join(""); 
            gallery.appendChild(columnDiv);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data initially and refresh every 30 seconds for new entries
fetchSubmissions();
setInterval(fetchSubmissions, 30000);
