export class IngredientModel {
  constructor(data) {
    this.ingredient = data.ingredient.toLowerCase();
    this.quantity = parseInt(data.quantity);
    this.unit = data.unit;
  }
}
