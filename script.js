document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");

    // Example: Fetch data (replace with actual form data)
    const submissions = [
        { type: "image", src: "https://via.placeholder.com/200" },
        { type: "text", content: "This is a text submission" },
        { type: "image", src: "https://via.placeholder.com/200" }
    ];

    submissions.forEach(submission => {
        const item = document.createElement("div");
        item.classList.add("item");

        if (submission.type === "image") {
            const img = document.createElement("img");
            img.src = submission.src;
            item.appendChild(img);
        } else {
            item.textContent = submission.content;
        }

        gallery.appendChild(item);
    });
});
