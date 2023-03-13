import TagController from "../controllers/TagController.js";

function addTagEvent(managers, configs) {
  document.addEventListener("addTag", (e) => {
    const { tags, filters, recipes } = managers;
    const { recipeConfig, filtersConfig, tagConfig } = configs;
    const tagController = new TagController(e.detail);

    managers.tags.add(tagController);
    managers.tags.render(tagConfig.container, tagConfig.className);

    if (e.detail.type === "ingredient") {
      managers.recipes.searchByIngredient(e.detail.name);
    } else if (e.detail.type === "appliance") {
      managers.recipes.searchByAppliance(e.detail.name);
    } else if (e.detail.type === "utensil") {
      managers.recipes.searchByUtensil(e.detail.name);
    }
    managers.recipes.render(recipeConfig.container, recipeConfig.className);
  });
}

function removeTagEvent(tagManager, tagConfig) {
  document.addEventListener("removeTag", (e) => {
    tagManager.remove(e.detail.name);
    tagManager.render(tagConfig.container, tagConfig.className);
  });
}

function addFilterEvent(filtersManagers, filtersConfig) {
  document.addEventListener("addFilter", (e) => {
    filtersManagers[e.detail.type].show(e.detail.name);
    filtersManagers[e.detail.type].render(
      filtersConfig[e.detail.type].container,
      filtersConfig[e.detail.type].className
    );
  });
}

function removeFilterEvent(filtersManagers, filtersConfig) {
  document.addEventListener("removeFilter", (e) => {
    filtersManagers[e.detail.type].hide(e.detail.name);
    filtersManagers[e.detail.type].render(
      filtersConfig[e.detail.type].container,
      filtersConfig[e.detail.type].className
    );
  });
}

function searchRecipeEvent(managers, recipeConfig, filtersConfig) {
  const searchInput = document.querySelector(".search__input");
  searchInput.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
      console.log(managers.recipes.activeRecipes);
      managers.recipes.search(e.target.value);
      managers.recipes.render(recipeConfig.container, recipeConfig.className);
      console.log(managers.recipes.activeRecipes);

      const ingredientsName = [
        ...new Set(
          managers.recipes.activeRecipes.flatMap((recipe) =>
            recipe.model.ingredients.map((ingredient) => ingredient.name)
          )
        ),
      ];

      const appliancesName = [
        ...new Set(
          managers.recipes.activeRecipes.map((recipe) =>
            recipe.model.appliance.toLowerCase()
          )
        ),
      ];

      const utensilsName = [
        ...new Set(
          managers.recipes.activeRecipes.flatMap(
            (recipe) => recipe.model.utensils
          )
        ),
      ];

      managers.filters.ingredient.reset();
      managers.filters.appliance.reset();
      managers.filters.utensil.reset();

      managers.filters.ingredient.showedFilters.forEach((filter) => {
        if (!ingredientsName.includes(filter.model.name)) {
          managers.filters.ingredient.hide(filter.model.name);
        }
      });

      managers.filters.appliance.showedFilters.forEach((filter) => {
        if (!appliancesName.includes(filter.model.name)) {
          managers.filters.appliance.hide(filter.model.name);
        }
      });

      managers.filters.utensil.showedFilters.forEach((filter) => {
        if (!utensilsName.includes(filter.model.name)) {
          managers.filters.utensil.hide(filter.model.name);
        }
      });

      managers.filters.ingredient.render(
        filtersConfig.ingredient.container,
        filtersConfig.ingredient.className
      );

      managers.filters.appliance.render(
        filtersConfig.appliance.container,
        filtersConfig.appliance.className
      );

      managers.filters.utensil.render(
        filtersConfig.utensil.container,
        filtersConfig.utensil.className
      );
    } else {
      managers.recipes.reset();
      managers.recipes.render(recipeConfig.container, recipeConfig.className);

      managers.filters.ingredient.reset();
      managers.filters.appliance.reset();
      managers.filters.utensil.reset();

      managers.filters.ingredient.render(
        filtersConfig.ingredient.container,
        filtersConfig.ingredient.className
      );

      managers.filters.appliance.render(
        filtersConfig.appliance.container,
        filtersConfig.appliance.className
      );

      managers.filters.utensil.render(
        filtersConfig.utensil.container,
        filtersConfig.utensil.className
      );
    }
  });
}

export {
  addTagEvent,
  removeTagEvent,
  addFilterEvent,
  removeFilterEvent,
  searchRecipeEvent,
};
