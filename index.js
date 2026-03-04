const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const message = document.getElementById("message");

// click on search button
searchBtn.addEventListener("click", handleSearch);

// press enter to search
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        message.textContent = "Please type a dish name to search.";
        resultsContainer.innerHTML = "";
        return;
    }

    message.textContent = "Searching recipes...";
    resultsContainer.innerHTML = "";

    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(query))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.meals) {
                message.textContent = "No recipes found. Try another dish.";
                resultsContainer.innerHTML = "";
                return;
            }

            message.textContent = "Found " + data.meals.length + " recipe(s).";
            displayResults(data.meals);
        })
        .catch(function () {
            message.textContent = "Something went wrong. Please try again.";
            resultsContainer.innerHTML = "";
        });
}

function fetchDetails(id) {
    message.textContent = "Loading recipe details...";

    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.meals || !data.meals[0]) {
                message.textContent = "Unable to load details.";
                return;
            }

            const meal = data.meals[0];
            showRecipeModal(meal);
        })
        .catch(function () {
            message.textContent = "Unable to load details.";
        });
}