const form = document.getElementById("imageForm");
const gallery = document.getElementById("gallery");

// Load saved images from local storage on page load
window.onload = function() {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages.forEach(imageUrl => addImage(imageUrl));
};

// Function to add an image with delete functionality
function addImage(url) {
    // Create a container for the image and delete button
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    // Create the image element and set its source
    const img = document.createElement("img");
    img.src = url;
    img.alt = "User added image";

    // Add event listener for modal functionality (Stage 3 enhancement)
    img.addEventListener("click", function() {
        showModal(url);
    });

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    // Event listener to delete image from DOM and local storage
    deleteButton.onclick = function() {
        imgContainer.remove(); // Remove from the DOM
        removeImageFromLocal(url); // Update local storage
    };

    // Append image and delete button to the container
    imgContainer.appendChild(img);
    imgContainer.appendChild(deleteButton);

    // Append the container to the gallery
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

// Show image in a modal when clicked (carousel effect)
function showModal(imageUrl) {
    // Create a modal container to cover the whole screen
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Create the image element
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Full-screen image";
    img.classList.add("full-screen-image");

    // Append the image to the modal
    modal.appendChild(img);

    // Close modal on click
    modal.addEventListener("click", function() {
        modal.remove();
    });

    // Append modal to body
    document.body.appendChild(modal);
}

// Form submit event to add image from URL
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    
    // Validate URL format for image files
    if (imageUrl && imageUrl.match(/\.(jpeg|jpg|png|gif)$/)) {
        addImage(imageUrl);            // Add image to gallery
        saveImageToLocal(imageUrl);     // Save image URL to local storage
        document.getElementById("imageUrl").value = ""; // Clear input field
    } else {
        alert("Please enter a valid image URL ending in .jpeg, .jpg, .png, or .gif.");
    }
});

