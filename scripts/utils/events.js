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

export { addTagEvent, removeTagEvent, addFilterEvent, removeFilterEvent };
