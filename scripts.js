let recipesFullList = recipes;

const recipesBlock = document.getElementById("recipes-block");

// display all recipes

function generateRecipesCardsList(recipesList) {
  recipesList.forEach(function (recipeItem) {
    let descriptionToArray = recipeItem.description.split(" ");
    if (descriptionToArray.length > 30) {
      let shortenedDescriptionArray = descriptionToArray.slice(0, 30);
      shortenedDescriptionArray.push("...");
      let stringifiedshortenedDescriptionArray =
        shortenedDescriptionArray.join(" ");
      recipeItem.description = stringifiedshortenedDescriptionArray;
    }

    const templateRecipeCard = `
        <div class="recipe-card">
            <div class="empty-photo">
            </div>
            <div>
                <div class="recipe-header">
                    <div class="recipe-name">
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

// display tag filters lists

const ingredientsList = [];

recipesFullList.forEach(function (recipeItem) {
  recipeItem.ingredients.forEach(function (ingredientItem) {
    const existingIngredient = ingredientsList.find(
      (element) => element === ingredientItem.ingredient
    );

    if (!existingIngredient) {
      ingredientsList.push(ingredientItem.ingredient);
    }
  });
});

console.log(ingredientsList);

const appliancesList = [];

recipesFullList.forEach(function (recipeItem) {
  const existingAppliance = appliancesList.find(
    (element) => element === recipeItem.appliance
  );

  if (!existingAppliance) {
    appliancesList.push(recipeItem.appliance);
  }
});

console.log(appliancesList);

const utensilsList = [];

recipesFullList.forEach(function (recipeItem) {
  recipeItem.utensils.forEach(function (utensilItem) {
    const existingUtensil = utensilsList.find(
      (element) => element === utensilItem
    );

    if (!existingUtensil) {
      utensilsList.push(utensilItem);
    }
  });
});

console.log(utensilsList);
