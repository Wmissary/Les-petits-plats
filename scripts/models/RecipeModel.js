import IngredientModel from "./IngredientModel.js";

export default class RecipeModel {
  constructor(data) {
    this.id = data.id;

    this.name = data.name;
    this.description = data.description;

    this.appliance = data.appliance;

    this.ingredients = data.ingredients.map(
      (item) => new IngredientModel(item)
    );

    this.utensils = data.ustensils;

    this.time = data.time;
    this.servings = data.servings;
  }
}
