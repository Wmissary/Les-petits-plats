import FilterManager from "../managers/FiltersManager.js";
import TagsManager from "../managers/TagsManager.js";

const recipesConfig = {
  url: "data/recipes.json",
  container: document.querySelector(".recipes"),
  className: "recipe",
};

const filtersConfig = {
  ingredients: {
    container: document.querySelector(".ingredients"),
    className: "filter",
    type: "ingredient",
    manager: new FilterManager(),
  },
  appliances: {
    container: document.querySelector(".appliances"),
    className: "filter",
    type: "appliance",
    manager: new FilterManager(),
  },
  utensils: {
    container: document.querySelector(".utensils"),
    className: "filter",
    type: "utensil",
    manager: new FilterManager(),
  },
};

const tagsConfig = {
  container: document.querySelector(".active-filters"),
  className: "tag",
  manager: new TagsManager(),
};

export { recipesConfig, filtersConfig, tagsConfig };
