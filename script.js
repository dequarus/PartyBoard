const sheetURL = "https://script.google.com/macros/s/AKfycbxoImdMxOs-BqVLYOMpSQj9Tf21HI13AeSECvL6c4QY2NzTUG5Bvt-oTO-Sj1ghuHLaRw/exec";  // Replace with actual URL

async function fetchSubmissions() {
    try {
        let response = await fetch(sheetURL);
        let data = await response.json();
        let entries = data.feed.entry;
        
        const collage = document.getElementById("collage");
        collage.innerHTML = ""; // Clear previous items

        entries.forEach(entry => {
            let imageUrl = entry["gsx$image"]["$t"];
            let text = entry["gsx$text"]["$t"];

            let item = document.createElement("div");
            item.classList.add("item");

            if (imageUrl) {
                let img = document.createElement("img");
                img.src = imageUrl;
                item.appendChild(img);
            } else if (text) {
                item.innerText = text;
            }

            collage.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
    }
}

fetchSubmissions();
setInterval(fetchSubmissions, 10000);
