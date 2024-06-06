/**
 * Runs the fetchData function once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

/**
 * Fetches data from the Rick and Morty API and displays it using mostrarCard.
 * Shows a loading indicator while the data is being fetched.
 */
const fetchData = async () => {
    try {
        loadingData(true); // Show loading indicator
        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();
        mostrarCard(data); // Display the fetched data
    } catch (error) {
        console.log(error); // Log any errors
    } finally {
        loadingData(false); // Hide loading indicator
    }
};

/**
 * Displays dynamic cards with data provided.
 * 
 * @param {Object} data - The data containing the results to display.
 * @param {Array} data.results - An array of objects, each representing an item to be displayed.
 * @param {string} data.results[].name - The name of the item.
 * @param {string} data.results[].species - The species of the item.
 * @param {string} data.results[].image - The URL of the item's image.
 */
const mostrarCard = (data) => {
    const cards = document.getElementById("card-dinamicas");
    const templateCard = document.getElementById("template-card").content;
    const fragment = document.createDocumentFragment();

    data.results.forEach((item) => {
        const clone = templateCard.cloneNode(true); 
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("p").textContent = item.species;
        clone.querySelector(".card-img-top").setAttribute("src", item.image);
        fragment.appendChild(clone); // Append the clone to the fragment
    });

    cards.appendChild(fragment); // Append the fragment to the container
};

/**
 * Toggles the visibility of a loading indicator.
 * 
 * @param {boolean} estado - The state of the loading indicator. True to show, false to hide.
 */
const loadingData = (estado) => {
    const loading = document.getElementById("loading");
    if (estado) {
        loading.classList.remove("d-none"); // Show loading indicator
    } else {
        loading.classList.add("d-none"); // Hide loading indicator
    }
};
