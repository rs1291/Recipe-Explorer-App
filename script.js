function showModal() {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal["strIngredient" + i];
        const measure = meal["strMeasure" + i];
        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += "<li>" + ingredient + (measure ? " - " + measure : "") + "</li>";
        }
    }

    let youtubeHtml = "";
    if (meal.strYoutube) {
        youtubeHtml = `
            <p class="mt-2">
                <strong>Watch on YouTube</strong>
                <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Click here</a>
            </p>
        `;
    }

    const modalBody = document.getElementById("ModalBody");
    modalBody.innerHTML = `
        <div class="row g-3">
            <div class="col-md-5">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded mb-2">
                <p class="mb-1"><strong>Area:</strong> ${meal.strArea || "World"}</p>
                <p class="mb-1"><strong>Category:</strong> ${meal.strCategory || "Dish"}</p>
            </div>
            <div class="col-md-7">
                <h4 class="fw-bolf mb-2">${meal.strMeal}</h4>
                <h6 class="fw-semi-bold">Ingredients:</h6>
                <ul class="mb-3">${ingredientsList}</ul>
                <h6 class="fw-semibold">Instructions:</h6>
                <div class="instructions-box">
                    ${meal.strInstructions}
                </div>
                ${youtubeHtml}
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
    modal.show();
}

// Data structure for favourites
let favourites = JSON.parse(localStorage.getItem("favourites")) || {};

// Show modal with extended UI
function showModal(meal) {
    const modal = document.getElementById("modal");

    const isFavourite = favourites[meal.idMeal];

    modal.innerHTML = `
    <div class="modal-content">
      <h2>${meal.strMeal}</h2>

      <img src="${meal.strMealThumb}" width="200" />

      <p>${meal.strInstructions}</p>

      <!-- Favourite Button -->
      <button id="favBtn">
        ${isFavourite ? "Remove favourite" : "Mark as favourite"}
      </button>

      <!-- Notes Area -->
      <div>
        <label>My notes:</label><br/>
        <textarea id="notesArea" rows="4" cols="40">${isFavourite ? isFavourite.notes || "" : ""
        }</textarea>
      </div>

      <!-- Save Notes Button -->
      <button id="saveNotesBtn">Save notes</button>

      <br/><br/>
      <button onclick="closeModal()">Close</button>
    </div>
  `;

    modal.style.display = "block";

    // Add event listeners
    document.getElementById("favBtn").addEventListener("click", () => {
        toggleFavourite(meal);
    });

    document.getElementById("saveNotesBtn").addEventListener("click", () => {
        saveNotes(meal.idMeal);
    });
}

// Toggle favourite
function toggleFavourite(meal) {
    if (favourites[meal.idMeal]) {
        delete favourites[meal.idMeal];
    } else {
        favourites[meal.idMeal] = {
            title: meal.strMeal,
            notes: ""
        };
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));

    // Refresh modal UI
    showModal(meal);
}

// Save notes
function saveNotes(mealId) {
    const notes = document.getElementById("notesArea").value;

    if (!favourites[mealId]) {
        favourites[mealId] = {
            title: "Unknown",
            notes: notes
        };
    } else {
        favourites[mealId].notes = notes;
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));

    alert("Notes saved!");
}

// Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}