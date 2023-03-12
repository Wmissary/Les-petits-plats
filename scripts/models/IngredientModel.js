export default class IngredientModel {
  constructor({ ingredient, quantity = "", unit = "" } = {}) {
    this.name = ingredient.toLowerCase();
    this.quantity = quantity;
    this.unit = unit;
  }
}
