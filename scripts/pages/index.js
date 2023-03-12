import { fetchData } from "../utils/fetchData.js";

import RecipeController from "../controllers/RecipeController.js";
import RecipesManager from "../managers/RecipesManager.js";

import FilterController from "../controllers/FilterController.js";

import TagController from "../controllers/TagController.js";

import { recipesConfig, filtersConfig, tagsConfig } from "../utils/config.js";

async function init({ recipesConfig, filtersConfig, tagsConfig }) {
  const data = await fetchData(recipesConfig.url);
  const recipesControllers = [];

  for (const recipe of data) {
    const recipeController = new RecipeController(recipe);
    recipesControllers.push(recipeController);

    for (const ingredient of recipe.ingredients) {
      const filterController = new FilterController({
        name: ingredient.ingredient,
        type: filtersConfig.ingredients.type,
      });
      filtersConfig.ingredients.manager.add(filterController);
    }

    const filterController = new FilterController({
      name: recipe.appliance,
      type: filtersConfig.appliances.type,
    });
    filtersConfig.appliances.manager.add(filterController);

    for (const utensil of recipe.ustensils) {
      const filterController = new FilterController({
        name: utensil,
        type: filtersConfig.utensils.type,
      });
      filtersConfig.utensils.manager.add(filterController);
    }
  }

  const recipesManager = new RecipesManager(recipesControllers);
  recipesManager.sort();
  recipesManager.render(recipesConfig.container, recipesConfig.className);

  for (const filter of Object.values(filtersConfig)) {
    filter.manager.sort();
    filter.manager.render(filter.container, filter.className);
  }
  document.addEventListener("addTag", (e) => {
    const tagController = new TagController(e.detail);
    tagsConfig.manager.add(tagController);
    tagsConfig.manager.sort();
    tagsConfig.manager.render(tagsConfig.container, tagsConfig.className);
    for (const filter of Object.values(filtersConfig)) {
      if (filter.type === e.detail.type) {
        filter.manager.remove(e.detail.name);
        filter.manager.render(filter.container, filter.className);
      }
    }
  });

  document.addEventListener("addFilter", (e) => {
    const filterController = new FilterController(e.detail);
    for (const filter of Object.values(filtersConfig)) {
      if (filter.type === e.detail.type) {
        filter.manager.add(filterController);
        filter.manager.sort();
        filter.manager.render(filter.container, filter.className);
      }
    }
    tagsConfig.manager.remove(e.detail.name);
  });
}

init({
  recipesConfig,
  filtersConfig,
  tagsConfig,
});
