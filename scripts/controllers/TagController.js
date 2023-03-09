export class TagController {
  constructor(data) {
    this.model = data.model;
    this.view = data.view;
  }
  render() {
    this.view.render();
  }
}
