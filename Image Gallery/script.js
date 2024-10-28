const form = document.getElementById("imageForm");
const gallery = document.getElementById("gallery");

// Load saved images from local storage on page load
window.onload = function() {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages.forEach(imageUrl => addImage(imageUrl));
};

// Function to add an image with delete functionality
function addImage(url) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = url;
    img.alt = "User added image";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        imgContainer.remove(); // Remove from the DOM
        removeImageFromLocal(url); // Update local storage
    };

    imgContainer.appendChild(img);
    imgContainer.appendChild(deleteButton);
    gallery.appendChild(imgContainer);
}

// Save image URL to local storage
function saveImageToLocal(url) {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages.push(url);
    localStorage.setItem("images", JSON.stringify(savedImages));
}

// Remove image URL from local storage
function removeImageFromLocal(url) {
    let savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages = savedImages.filter(imageUrl => imageUrl !== url);
    localStorage.setItem("images", JSON.stringify(savedImages));
}

// Form submit event to add image from URL
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    
    if (imageUrl && imageUrl.match(/\.(jpeg|jpg|png|gif)$/)) {
        addImage(imageUrl);
        saveImageToLocal(imageUrl);
        document.getElementById("imageUrl").value = ""; // Clear input
    } else {
        alert("Please enter a valid image URL.");
    }
});
