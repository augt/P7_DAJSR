let recipesFullList = recipes;

const recipesBlock = document.getElementById("recipes-block");

// display all recipes

function generateRecipesCardsList(recipesList) {
  recipesBlock.innerHTML = "";
  recipesList.forEach(function (recipeItem) {
    let descriptionToArray = recipeItem.description.split(" ");
    if (descriptionToArray.length > 30) {
      let shortenedDescriptionArray = descriptionToArray.slice(0, 30);
      shortenedDescriptionArray.push("...");
      let stringifiedshortenedDescriptionArray =
        shortenedDescriptionArray.join(" ");
      recipeItem.description = stringifiedshortenedDescriptionArray;
    }

    const templateRecipeCard = `<div class="recipe-card">
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
        </div>`;
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

      const templateRecipeCard = `<li class="ingredient-card-list-item">
        <span>${ingredientItem.ingredient}: </span>${ingredientItem.quantity} ${ingredientItem.unit}
        </li>`;
      ingredientsUl.insertAdjacentHTML("beforeend", templateRecipeCard);
    });
  });
}

generateRecipesCardsList(recipesFullList);

// display tag filters lists

let ingredientsList = [];

function getIngredientsList(recipesList) {
  ingredientsList = [];
  recipesList.forEach(function (recipeItem) {
    recipeItem.ingredients.forEach(function (ingredientItem) {
      const existingIngredient = ingredientsList.find(
        (element) =>
          element.toLowerCase() === ingredientItem.ingredient.toLowerCase()
      );

      if (!existingIngredient) {
        ingredientsList.push(ingredientItem.ingredient);
      }
    });
  });
}

getIngredientsList(recipesFullList);

// let ingredientsFilteredList = [...ingredientsList]

let appliancesList = [];

function getAppliancesList(recipesList) {
  appliancesList = [];
  recipesList.forEach(function (recipeItem) {
    const existingAppliance = appliancesList.find(
      (element) => element.toLowerCase() === recipeItem.appliance.toLowerCase()
    );

    if (!existingAppliance) {
      appliancesList.push(recipeItem.appliance);
    }
  });
}
getAppliancesList(recipesFullList);

// let appliancesFilteredList = [...appliancesList]

let utensilsList = [];

function getUtensilsList(recipesList) {
  utensilsList = [];
  recipesList.forEach(function (recipeItem) {
    recipeItem.utensils.forEach(function (utensilItem) {
      const existingUtensil = utensilsList.find(
        (element) => element.toLowerCase() === utensilItem.toLowerCase()
      );

      if (!existingUtensil) {
        utensilsList.push(utensilItem);
      }
    });
  });
}
getUtensilsList(recipesFullList);

// let utensilsFilteredList = [...utensilsList]

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
    const liNode = document.createElement("li");
    liNode.textContent = tagItem;
    tagsBlockNode.appendChild(liNode);
    liNode.addEventListener("click", function () {
      showSelectedTag(liNode);
      filterRecipesByTags(liNode); // ! function event click on tag filter element
    });
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
  ingredientsList,
  ingredientsTagsBlock /* , ingredientsTagsNodesList */
);
generateTagsNodesList(
  appliancesList,
  appliancesTagsBlock /* , appliancesTagsNodesList */
);
generateTagsNodesList(
  utensilsList,
  utensilsTagsBlock /* , utensilsTagsNodesList */
);

// filter tags lists by searching tags

ingredientsInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(
    event.target.value,
    ingredientsTagsBlock,
    ingredientsList
  );
});

appliancesInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(event.target.value, appliancesTagsBlock, appliancesList);
});

utensilsInput.addEventListener("keyup", (event) => {
  tagsListSearchFilter(event.target.value, utensilsTagsBlock, utensilsList);
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

// selecting tags and filtering recipes

const chosenTagsBlock = document.querySelector(".chosen-tags-block");

function showSelectedTag(node) {
  const tagDiv = document.createElement("div");
  tagDiv.classList.add("chosen-tag");
  const tagSubDiv = document.createElement("div");
  const tagDeleteIcon = document.createElement("img");
  tagDeleteIcon.setAttribute("src", "icons/delete-icon.svg");
  tagDeleteIcon.setAttribute("alt", "delete icon");
  if (node.parentNode === ingredientsTagsBlock) {
    tagDiv.classList.add("ingredient-chosen-tag");
  }
  if (node.parentNode === appliancesTagsBlock) {
    tagDiv.classList.add("appliance-chosen-tag");
  }
  if (node.parentNode === utensilsTagsBlock) {
    tagDiv.classList.add("utensil-chosen-tag");
  }
  tagSubDiv.textContent = node.textContent;
  chosenTagsBlock.appendChild(tagDiv);
  tagDiv.appendChild(tagSubDiv);
  tagDiv.appendChild(tagDeleteIcon);
}

let filteredRecipesList = [...recipesFullList];

function filterRecipesByTags(node) {
  const chosenIngredientsTagsList = chosenTagsBlock.querySelectorAll(
    ".ingredient-chosen-tag div"
  );

  const chosenAppliancesTagsList = chosenTagsBlock.querySelectorAll(
    ".appliance-chosen-tag div"
  );

  const chosenUtensilsTagsList = chosenTagsBlock.querySelectorAll(
    ".utensil-chosen-tag div"
  );

  chosenIngredientsTagsList.forEach(function (chosenIngredientTag) {
    function hasIngredient(element) {
      return (
        element.ingredient.toLowerCase() ===
        chosenIngredientTag.textContent.toLowerCase()
      );
    }
    filteredRecipesList = filteredRecipesList.filter((recipeItem) => {
      return recipeItem.ingredients.some(hasIngredient) === true;
    });
  });

  chosenAppliancesTagsList.forEach(function (chosenApplianceTag) {
    filteredRecipesList = filteredRecipesList.filter((recipeItem) => {
      return recipeItem.appliance.toLowerCase() === chosenApplianceTag.textContent.toLowerCase();
    });
  });

  chosenUtensilsTagsList.forEach(function (chosenUtensilTag) {
    function hasUtensil(element) {
      return (
        element.toLowerCase() ===
        chosenUtensilTag.textContent.toLowerCase()
      );
    }
    filteredRecipesList = filteredRecipesList.filter((recipeItem) => {
      return recipeItem.utensils.some(hasUtensil) === true;
    });
  });

  console.log(filteredRecipesList);
  generateRecipesCardsList(filteredRecipesList);
  getIngredientsList(filteredRecipesList);
  getAppliancesList(filteredRecipesList);
  getUtensilsList(filteredRecipesList);
  generateTagsNodesList(
    ingredientsList,
    ingredientsTagsBlock /* , ingredientsTagsNodesList */
  );
  generateTagsNodesList(
    appliancesList,
    appliancesTagsBlock /* , appliancesTagsNodesList */
  );
  generateTagsNodesList(
    utensilsList,
    utensilsTagsBlock /* , utensilsTagsNodesList */
  );
}
