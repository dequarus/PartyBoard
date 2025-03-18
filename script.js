// URL of your Google Sheet (change this to your actual published URL)
const sheetURL = "YOUR_GOOGLE_SHEET_URL_HERE";  

// Fetch data from the Google Sheet and create grid items
async function fetchSubmissions() {
    try {
        // Fetch data from the Google Sheet
        let response = await fetch(sheetURL);
        let data = await response.json();
        let entries = data.feed.entry;  // Data from Google Sheets

        const collage = document.getElementById('collage');
        collage.innerHTML = '';  // Clear previous entries

        entries.forEach(entry => {
            let imageUrl = entry['gsx$image']['$t'];
            let text = entry['gsx$text']['$t'];

            let item = document.createElement('div');
            item.classList.add('item');

            if (imageUrl) {
                let img = document.createElement('img');
                img.src = imageUrl;
                item.appendChild(img);
            }

            if (text) {
                item.innerText = text;
            }

            collage.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function to load data and update the grid
fetchSubmissions();

// Refresh the data every 10 seconds to get new entries
setInterval(fetchSubmissions, 10000);
