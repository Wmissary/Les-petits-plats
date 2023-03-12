export default class RecipesManager {
  constructor(recipes) {
    this.recipes = recipes;
    this.activeRecipes = this.recipes;
  }
  sort() {
    this.activeRecipes = this.activeRecipes.sort((a, b) => {
      return a.model.name.localeCompare(b.model.name);
    });
  }
  render(container, className) {
    container.innerHTML = "";
    for (const controller of this.activeRecipes) {
      controller.render(container, className);
    }
  }
}
