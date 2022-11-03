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

    const ingredientsUl = document.createElement("ul");
    ingredientsBlock.appendChild(ingredientsUl);

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
      ingredientsUl.insertAdjacentHTML("beforeend", templateRecipeCard);
    });
  });
}

generateRecipesCardsList(recipesFullList);

// display tag filters lists

let ingredientsFullList = [];

recipesFullList.forEach(function (recipeItem) {
  recipeItem.ingredients.forEach(function (ingredientItem) {
    const existingIngredient = ingredientsFullList.find(
      (element) =>
        element.toLowerCase() === ingredientItem.ingredient.toLowerCase()
    );

    if (!existingIngredient) {
      ingredientsFullList.push(ingredientItem.ingredient);
    }
  });
});
// let ingredientsFilteredList = [...ingredientsFullList]

let appliancesFullList = [];

recipesFullList.forEach(function (recipeItem) {
  const existingAppliance = appliancesFullList.find(
    (element) => element.toLowerCase() === recipeItem.appliance.toLowerCase()
  );

  if (!existingAppliance) {
    appliancesFullList.push(recipeItem.appliance);
  }
});
// let appliancesFilteredList = [...appliancesFullList]

let utensilsFullList = [];

recipesFullList.forEach(function (recipeItem) {
  recipeItem.utensils.forEach(function (utensilItem) {
    const existingUtensil = utensilsFullList.find(
      (element) => element.toLowerCase() === utensilItem.toLowerCase()
    );

    if (!existingUtensil) {
      utensilsFullList.push(utensilItem);
    }
  });
});
// console.log(utensilsFullList);
// let utensilsFilteredList = [...utensilsFullList]

const ingredientsInput = document.querySelector(".ingredients-search-input");
const ingredientsTagsBlock = document.querySelector(
  ".ingredients-search-block .tags-block"
);
const appliancesInput = document.querySelector(".appliances-search-input");
const appliancesTagsBlock = document.querySelector(
  ".appliances-search-block .tags-block"
);
const utensilsInput = document.querySelector(".utensils-search-input");
const utensilsTagsBlock = document.querySelector(
  ".utensils-search-block .tags-block"
);

function showTagsBlock(inputNode, tagsBlockNode) {
  inputNode.addEventListener("click", () => {
    if (inputNode === ingredientsInput) {
      if (ingredientsTagsBlock.querySelectorAll("li").length < 41) {
        inputNode.classList.add("tag-input-bigger");
      } else {
        inputNode.classList.add("tag-input-way-bigger");
      }
      inputNode.setAttribute("placeholder", "Rechercher un ingrédient");
    }
    if (inputNode === appliancesInput) {
      inputNode.classList.add("tag-input-bigger");
      inputNode.setAttribute("placeholder", "Rechercher un appareil");
    }
    if (inputNode === utensilsInput) {
      inputNode.classList.add("tag-input-bigger");
      inputNode.setAttribute("placeholder", "Rechercher un ustensile");
    }

    tagsBlockNode.style.display = "flex";
  });
}

showTagsBlock(ingredientsInput, ingredientsTagsBlock);
showTagsBlock(appliancesInput, appliancesTagsBlock);
showTagsBlock(utensilsInput, utensilsTagsBlock);

/* let ingredientsTagsNodesList = [];
let appliancesTagsNodesList = [];
let utensilsTagsNodesList = []; */

function generateTagsNodesList(tagsList, tagsBlockNode /* , tagsNodesList */) {
  tagsBlockNode.innerHTML = "";
  // tagsNodesList = [];
  tagsList.forEach(function (tagItem) {
    const templateTagListElement = `
        <li id=${tagItem}>
        ${tagItem}
        </li>
        `;
    tagsBlockNode.insertAdjacentHTML("beforeend", templateTagListElement);
    /* const tagNodeItem = document.getElementById(`${tagItem}`)
    tagsNodesList.push(tagNodeItem) */
  });
  if (
    ingredientsTagsBlock.querySelectorAll("li").length < 41 &&
    document.activeElement === ingredientsInput
  ) {
    ingredientsInput.classList.add("tag-input-bigger");
    ingredientsInput.classList.remove("tag-input-way-bigger");
  } else if (
    ingredientsTagsBlock.querySelectorAll("li").length > 41 &&
    document.activeElement === ingredientsInput
  ) {
    ingredientsInput.classList.remove("tag-input-bigger");
    ingredientsInput.classList.add("tag-input-way-bigger");
  }
}
generateTagsNodesList(
  ingredientsFullList,
  ingredientsTagsBlock /* , ingredientsTagsNodesList */
);
generateTagsNodesList(
  appliancesFullList,
  appliancesTagsBlock /* , appliancesTagsNodesList */
);
generateTagsNodesList(
  utensilsFullList,
  utensilsTagsBlock /* , utensilsTagsNodesList */
);

// filter tags lists by searching tags

ingredientsInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(
    event.target.value,
    ingredientsTagsBlock,
    ingredientsFullList
  );
});

appliancesInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(
    event.target.value,
    appliancesTagsBlock,
    appliancesFullList
  );
});

utensilsInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(event.target.value, utensilsTagsBlock, utensilsFullList);
});

function tagsListSearchFilter(searchString, tagsBlockNode, tagsList) {
  const filteredTagsList = tagsList.filter((tagItem) => {
    return tagItem.toLowerCase().includes(searchString.toLowerCase());
  });
  generateTagsNodesList(filteredTagsList, tagsBlockNode);
}

// hide tags list
const body = document.querySelector("body");
body.addEventListener("click", () => {
  if (document.activeElement !== ingredientsInput) {
    ingredientsTagsBlock.style.display = "none";
    ingredientsInput.classList.remove("tag-input-way-bigger");
    ingredientsInput.classList.remove("tag-input-bigger");
    ingredientsInput.setAttribute("placeholder", "Ingrédients");
  }
  if (document.activeElement !== appliancesInput) {
    appliancesTagsBlock.style.display = "none";
    appliancesInput.classList.remove("tag-input-bigger");
    appliancesInput.setAttribute("placeholder", "Appareils");
  }
  if (document.activeElement !== utensilsInput) {
    utensilsTagsBlock.style.display = "none";
    utensilsInput.classList.remove("tag-input-bigger");
    utensilsInput.setAttribute("placeholder", "Ustensiles");
  }
});
