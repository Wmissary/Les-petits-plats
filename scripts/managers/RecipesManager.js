export class RecipesManager {
  constructor() {
    this.recipes = new Set([]);
  }
  addRecipe(recipe) {
    this.recipes.add(recipe);
  }
  removeRecipe(recipeName) {
    this.recipes = new Set(
      [...this.recipes].filter((recipe) => recipe.model.name !== recipeName)
    );
  }
  sortRecipes() {
    this.recipes = new Set(
      [...this.recipes].sort((a, b) => {
        return a.model.name.localeCompare(b.model.name);
      })
    );
  }
  render(container) {
    container.innerHTML = "";
    for (const recipe of this.recipes) {
      recipe.render();
    }
  }
}
