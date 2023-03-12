import RecipeModel from "../models/RecipeModel.js";
import RecipeView from "../views/RecipeView.js";

export default class RecipeController {
  constructor(data) {
    this.model = new RecipeModel(data);
    this.view = new RecipeView(this.model);
  }
  render(container, className) {
    this.view.render(container, className);
  }
}
