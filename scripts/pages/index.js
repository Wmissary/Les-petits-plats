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

  addTagEvent(managers.tags, tagConfig);
  removeTagEvent(managers.tags, tagConfig);

  addFilterEvent(managers.filters, filtersConfig);
  removeFilterEvent(managers.filters, filtersConfig);
}

init({
  recipeConfig,
  filtersConfig,
  tagConfig,
});
