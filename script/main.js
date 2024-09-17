const searchBoxes = document.querySelectorAll(".searchBox");
const searchBtns = document.querySelectorAll(".searchBtn");
const cardsContainer = document.querySelector(".cards");

const fetchRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();

    if (data.meals) {
      cardsContainer.innerHTML = "";

      data.meals.forEach((meal) => {
        const card = `
          <div class="card" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${
          meal.strMeal
        }">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <h6 class="card-description">${meal.strCategory}</h6>
              <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
              <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-recipe-id="${
                meal.idMeal
              }">More</a>
            </div>
          </div>
        `;
        cardsContainer.innerHTML += card;
      });
    } else {
      console.log("No meals found for the given query");
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();

    if (data.meals) {
      const meal = data.meals[0];
      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
        <h5>${meal.strMeal}</h5>
        <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
      `;
    } else {
      console.log("No details found for the given recipe ID");
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
};

searchBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBoxes[index].value.trim();
    fetchRecipes(searchInput);
  });
});

document
  .getElementById("exampleModal")
  .addEventListener("show.bs.modal", (e) => {
    const button = e.relatedTarget; 
    const recipeId = button.getAttribute("data-recipe-id"); 
    fetchRecipeDetails(recipeId); 
  });
