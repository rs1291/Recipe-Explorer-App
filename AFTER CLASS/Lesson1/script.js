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