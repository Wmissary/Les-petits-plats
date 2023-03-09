import { RecipeModel } from "../models/RecipeModel.js";
import { RecipeView } from "../views/RecipeView.js";
import { RecipeController } from "../controllers/RecipeController.js";

import { FilterModel } from "../models/FilterModel.js";
import { FilterView } from "../views/FilterView.js";
import { FilterController } from "../controllers/FilterController.js";

import { TagView } from "../views/TagView.js";
import { TagController } from "../controllers/TagController.js";

function createRecipeController(data, container, className) {
  const model = new RecipeModel(data);
  const view = new RecipeView({
    model,
    className,
    container,
  });
  const controller = new RecipeController({
    model,
    view,
  });
  return controller;
}

function createFilterController(data, container, className) {
  const model = new FilterModel(data);
  const view = new FilterView({
    model,
    className,
    container,
  });
  const controller = new FilterController({
    model,
    view,
  });
  return controller;
}

function createTagController(data, container, className) {
  const model = new FilterModel(data);
  const view = new TagView({
    model,
    className,
    container,
  });
  const controller = new TagController({
    model,
    view,
  });
  return controller;
}

export { createRecipeController, createFilterController, createTagController };
