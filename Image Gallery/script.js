const form = document.getElementById("imageForm");
const gallery = document.getElementById("gallery");
const fetchImagesButton = document.getElementById("fetchImages");

// Carousel elements
const carousel = document.getElementById("carousel");
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentCarouselIndex = 0;
let carouselImages = [];

// Default API Key for Pixabay API
const API_KEY = "47116047-47d590a30b47e5dcab1732a74"; // Replace with your actual API key

// Load saved images from local storage
window.onload = function () {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages.forEach((imageUrl) => addImage(imageUrl));
};

// Add image to gallery
function addImage(url) {
    const div = document.createElement("div");
    div.classList.add("gallery-item");
    // Create a container for the image and delete button
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    // Create the image element and set its source
    const img = document.createElement("img");
    img.src = url;
    img.alt = "User added image";
    img.addEventListener("click", () => openCarousel(url));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteImage(url, div);
    });

    div.appendChild(img);
    div.appendChild(deleteBtn);
    gallery.appendChild(div);
    carouselImages.push(url);

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

// Delete image from gallery and local storage
function deleteImage(url, element) {
    gallery.removeChild(element);
    carouselImages = carouselImages.filter((img) => img !== url);
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    const updatedImages = savedImages.filter((img) => img !== url);
    localStorage.setItem("images", JSON.stringify(updatedImages));
}

// Save image to local storage
function saveImageToLocal(url) {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    savedImages.push(url);
    localStorage.setItem("images", JSON.stringify(savedImages));
}

// Handle form submission for user-added images
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const imageUrl = document.getElementById("imageUrl").value.trim();
    if (imageUrl.match(/\.(jpeg|jpg|png|gif)$/)) {
        addImage(imageUrl);
        saveImageToLocal(imageUrl);
        document.getElementById("imageUrl").value = "";
    } else {
        alert("Please enter a valid image URL ending in .jpeg, .jpg, .png, or .gif.");
    }
});

// Open carousel
function openCarousel(startImage) {
    currentCarouselIndex = carouselImages.indexOf(startImage);
    carouselImage.src = carouselImages[currentCarouselIndex];
    carousel.style.display = "block";
}

// Close carousel
carousel.addEventListener("click", () => {
    carousel.style.display = "none";
});

// Navigate carousel
prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
    carouselImage.src = carouselImages[currentCarouselIndex];
});

nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    carouselImage.src = carouselImages[currentCarouselIndex];
});

// Fetch images based on a keyword provided by the user
fetchImagesButton.addEventListener("click", async function () {
    const keyword = document.getElementById("keyword").value.trim();
    
    if (keyword === "") {
        alert("Please enter a search keyword.");
        return;
    }

    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&per_page=10`);
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
            data.hits.forEach((item) => addImage(item.webformatURL));
        } else {
            alert("No images found for your search.");
        }
    } catch (error) {
        console.error("Error fetching images:", error);

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

