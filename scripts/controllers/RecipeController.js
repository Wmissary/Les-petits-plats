export class RecipeController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }
  render() {
    this.view.render();
  }
}
