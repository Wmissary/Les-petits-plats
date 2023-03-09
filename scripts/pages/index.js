import { fetchData } from "../utils/fetchData.js";

import { FiltersManager } from "../managers/FiltersManager.js";
import { TagsManager } from "../managers/TagsManager.js";
import { RecipesManager } from "../managers/RecipesManager.js";

import {
  createRecipeController,
  createFilterController,
} from "../utils/createController.js";

import { addTagEvent, addFilterEvent } from "../events/event.js";

async function init() {
  const data = await fetchData();

  const recipesContainer = document.querySelector(".recipes");
  const ingredientsContainer = document.querySelector(".ingredients");
  const appliancesContainer = document.querySelector(".appliances");
  const ustensilsContainer = document.querySelector(".utensils");
  const activeFiltersContainer = document.querySelector(".active-filters");

  const recipesManager = new RecipesManager();
  const ingredientsManager = new FiltersManager();
  const appliancesManager = new FiltersManager();
  const ustensilsManager = new FiltersManager();
  const tagsManager = new TagsManager();

  for (const item of data) {
    const recipeController = createRecipeController(
      item,
      recipesContainer,
      "recipe"
    );
    recipesManager.addRecipe(recipeController);

    for (const ingredient of item.ingredients) {
      const filterController = createFilterController(
        {
          name: ingredient.ingredient,
          type: "ingredient",
        },
        ingredientsContainer,
        "filter"
      );
      ingredientsManager.addFilter(filterController);
    }
    const filterController = createFilterController(
      {
        name: item.appliance,
        type: "appliance",
      },
      appliancesContainer,
      "filter"
    );
    appliancesManager.addFilter(filterController);

    for (const utensil of item.ustensils) {
      const filterController = createFilterController(
        {
          name: utensil,
          type: "utensil",
        },
        ustensilsContainer,
        "filter"
      );
      ustensilsManager.addFilter(filterController);
    }
  }
  recipesManager.sortRecipes();
  recipesManager.render(recipesContainer);

  ingredientsManager.sortFilters();
  ingredientsManager.render(ingredientsContainer);

  appliancesManager.sortFilters();
  appliancesManager.render(appliancesContainer);

  ustensilsManager.sortFilters();
  ustensilsManager.render(ustensilsContainer);

  addTagEvent(tagsManager, ingredientsManager, activeFiltersContainer);
  addTagEvent(tagsManager, appliancesManager, activeFiltersContainer);
  addTagEvent(tagsManager, ustensilsManager, activeFiltersContainer);

  addFilterEvent(tagsManager, ingredientsManager, ingredientsContainer);
  addFilterEvent(tagsManager, appliancesManager, appliancesContainer);
  addFilterEvent(tagsManager, ustensilsManager, ustensilsContainer);
}

init();
