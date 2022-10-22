let recipesFullList = recipes;

const recipesBlock = document.getElementById("recipes-block");

function generateRecipesCardsList(recipesList) {
  recipesList.forEach(function (recipeItem) {
    const templateRecipeCard = `
        <div class="recipe-card">
            <div class="empty-photo">
            </div>
            <div>
                <div class="recipe-header">
                    <div>
                    ${recipeItem.name}
                    </div>
                    <div class="duration">
                        <img src="icons/clock-icon.svg" alt="clock icon"/>
                        <span>${recipeItem.time} min</span>
                    </div>
                </div>
                <div class="recipe-body">
                    <div id="${recipeItem.id}" class="recipe-ingredients-block">
                    </div>
                    <div class="description">
                    ${recipeItem.description}
                    </div>
                </div>
            </div>
        </div>
        `;
    recipesBlock.insertAdjacentHTML("beforeend", templateRecipeCard);

    const ingredientsBlock = document.getElementById(recipeItem.id);

    const ingredientsList = document.createElement("ul");
    ingredientsBlock.appendChild(ingredientsList);

    recipeItem.ingredients.forEach(function (ingredientItem) {
      if (!ingredientItem.quantity) {
        ingredientItem.quantity = "";
      }
      if (!ingredientItem.unit) {
        ingredientItem.unit = "";
      }
      if (ingredientItem.unit === "grammes") {
        ingredientItem.unit = "g";
      }

      const templateRecipeCard = `
        <li class="ingredient-card-list-item">
        <span>${ingredientItem.ingredient}: </span>${ingredientItem.quantity} ${ingredientItem.unit}
        </li>
        `;
      ingredientsList.insertAdjacentHTML("beforeend", templateRecipeCard);
    });
  });
}

generateRecipesCardsList(recipesFullList);
