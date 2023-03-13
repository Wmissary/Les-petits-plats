const recipeConfig = {
  url: "data/recipes.json",
  container: document.querySelector(".recipes"),
  className: "recipe",
};

const filtersConfig = {
  ingredient: {
    container: document.querySelector(".ingredients"),
    className: "filter",
    type: "ingredient",
  },
  appliance: {
    container: document.querySelector(".appliances"),
    className: "filter",
    type: "appliance",
  },
  utensil: {
    container: document.querySelector(".utensils"),
    className: "filter",
    type: "utensil",
  },
};

const tagConfig = {
  container: document.querySelector(".active-filters"),
  className: "tag",
};

export { recipeConfig, filtersConfig, tagConfig };
