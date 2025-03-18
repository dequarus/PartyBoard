async function fetchData() {
    try {
        let response = await fetch('data.json'); // Fetch from GitHub-hosted JSON
        let data = await response.json();
        let container = document.getElementById('board');
        container.innerHTML = '';

        data.forEach(row => {
            let item = document.createElement('div');
            item.className = 'item';

            if (row.image) {
                let img = document.createElement('img');
                img.src = row.image;
                item.appendChild(img);
            }

            if (row.text) {
                let text = document.createElement('p');
                text.textContent = row.text;
                item.appendChild(text);
            }

            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData(); // Initial Fetch
setInterval(fetchData, 30000); // Refresh every 30 seconds
