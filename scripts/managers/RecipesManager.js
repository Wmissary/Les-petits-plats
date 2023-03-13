export default class RecipesManager {
  constructor() {
    this.recipes = [];
    this.activeRecipes = [];
  }
  add(recipe) {
    this.recipes.push(recipe);
    this.activeRecipes.push(recipe);
  }

  hide(name) {
    this.activeRecipes = this.activeRecipes.filter((recipe) => {
      return recipe.model.name !== name;
    });
  }

  show(name) {
    const recipe = this.recipes.find((recipe) => {
      return recipe.model.name === name;
    });
    this.activeRecipes.push(recipe);
  }

  sort() {
    this.activeRecipes = this.activeRecipes.sort((a, b) => {
      return a.model.name.localeCompare(b.model.name);
    });
  }
  render(container, className) {
    container.innerHTML = "";
    this.sort();
    for (const controller of this.activeRecipes) {
      controller.render(container, className);
    }
  }

  search(string) {
    this.activeRecipes = this.recipes.filter((recipe) => {
      return (
        recipe.model.name.toLowerCase().includes(string.toLowerCase()) ||
        recipe.model.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(string.toLowerCase())
        ) ||
        recipe.model.description.toLowerCase().includes(string.toLowerCase())
      );
    });
  }

  reset() {
    this.activeRecipes = this.recipes;
  }
}
