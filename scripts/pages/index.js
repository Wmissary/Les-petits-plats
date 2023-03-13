import { fetchData } from "../utils/fetchData.js";
import { recipeConfig, filtersConfig, tagConfig } from "../utils/config.js";
import {
  addTagEvent,
  removeTagEvent,
  addFilterEvent,
  removeFilterEvent,
} from "../utils/events.js";

import RecipeController from "../controllers/RecipeController.js";
import FilterController from "../controllers/FilterController.js";

import RecipesManager from "../managers/RecipesManager.js";
import FiltersManager from "../managers/FiltersManager.js";
import TagsManager from "../managers/TagsManager.js";

async function init({ recipeConfig, filtersConfig, tagConfig }) {
  const data = await fetchData(recipeConfig.url);

  const managers = {
    recipes: new RecipesManager(),
    filters: {
      ingredient: new FiltersManager(),
      appliance: new FiltersManager(),
      utensil: new FiltersManager(),
    },
    tags: new TagsManager(),
  };

  data.forEach((recipe) => {
    const recipeController = new RecipeController(recipe);
    managers.recipes.add(recipeController);

    const { ingredients, appliance, ustensils } = recipe;

    ingredients.forEach((ingredient) => {
      const ingredientFilterController = new FilterController({
        name: ingredient.ingredient,
        type: filtersConfig.ingredient.type,
      });
      managers.filters.ingredient.add(ingredientFilterController);
    });

    const applianceFilterController = new FilterController({
      name: appliance,
      type: filtersConfig.appliance.type,
    });
    managers.filters.appliance.add(applianceFilterController);

    ustensils.forEach((utensil) => {
      const utensilFilterController = new FilterController({
        name: utensil,
        type: filtersConfig.utensil.type,
      });
      managers.filters.utensil.add(utensilFilterController);
    });
  });

  managers.recipes.render(recipeConfig.container, recipeConfig.className);

  Object.entries(managers.filters).forEach(([key, value]) => {
    value.render(filtersConfig[key].container, filtersConfig[key].className);
  });

  addTagEvent(managers, {
    recipeConfig,
    filtersConfig,
    tagConfig,
  });
  removeTagEvent(managers.tags, tagConfig);

  addFilterEvent(managers.filters, filtersConfig);
  removeFilterEvent(managers.filters, filtersConfig);

  const searchIngredientFilters = document.querySelector(
    ".filters__search--ingredient"
  );
  const searchApplianceFilters = document.querySelector(
    ".filters__search--appliance"
  );
  const searchUstensilFilters = document.querySelector(
    ".filters__search--utensil"
  );

  const searchIngredientInput = document.getElementById("ingredient");
  const searchApplianceInput = document.getElementById("appliance");
  const searchUstensilInput = document.getElementById("utensil");

  const ingredientsContainer = document.querySelector(".ingredients");
  const appliancesContainer = document.querySelector(".appliances");
  const utensilsContainer = document.querySelector(".utensils");

  searchIngredientInput.addEventListener("click", (e) => {
    if (ingredientsContainer.style.display === "grid") {
      ingredientsContainer.style.display = "none";
    } else {
      ingredientsContainer.style.display = "grid";
    }
    searchIngredientFilters.classList.toggle("filters__search--active");
  });
  searchIngredientInput.addEventListener("keyup", (e) => {
    const ingredientsManager = managers.filters.ingredient;
    ingredientsManager.search(e.target.value);
    ingredientsManager.render(
      filtersConfig.ingredient.container,
      filtersConfig.ingredient.className
    );
  });

  searchApplianceInput.addEventListener("click", (e) => {
    if (appliancesContainer.style.display === "grid") {
      appliancesContainer.style.display = "none";
    } else {
      appliancesContainer.style.display = "grid";
    }
    searchApplianceFilters.classList.toggle("filters__search--active");
  });

  searchApplianceInput.addEventListener("keyup", (e) => {
    const appliancesManager = managers.filters.appliance;
    appliancesManager.search(e.target.value);
    appliancesManager.render(
      filtersConfig.appliance.container,
      filtersConfig.appliance.className
    );
  });

  searchUstensilInput.addEventListener("click", (e) => {
    if (utensilsContainer.style.display === "grid") {
      utensilsContainer.style.display = "none";
    } else {
      utensilsContainer.style.display = "grid";
    }
    searchUstensilFilters.classList.toggle("filters__search--active");
  });

  searchUstensilInput.addEventListener("keyup", (e) => {
    const utensilsManager = managers.filters.utensil;
    utensilsManager.search(e.target.value);
    utensilsManager.render(
      filtersConfig.utensil.container,
      filtersConfig.utensil.className
    );
  });

  document.addEventListener("click", (e) => {
    if (searchIngredientFilters.classList.contains("filters__search--active")) {
      if (!e.target.closest(".filters__search--ingredient")) {
        ingredientsContainer.style.display = "none";
        searchIngredientFilters.classList.remove("filters__search--active");
      }
    }
    if (searchApplianceFilters.classList.contains("filters__search--active")) {
      if (!e.target.closest(".filters__search--appliance")) {
        appliancesContainer.style.display = "none";
        searchApplianceFilters.classList.remove("filters__search--active");
      }
    }
    if (searchUstensilFilters.classList.contains("filters__search--active")) {
      if (!e.target.closest(".filters__search--utensil")) {
        utensilsContainer.style.display = "none";
        searchUstensilFilters.classList.remove("filters__search--active");
      }
    }
  });
}

init({
  recipeConfig,
  filtersConfig,
  tagConfig,
});
