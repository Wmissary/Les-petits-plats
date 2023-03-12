import FilterModel from "../models/FilterModel.js";
import TagView from "../views/TagView.js";

export default class TagController {
  constructor(data) {
    this.model = new FilterModel(data);
    this.view = new TagView(this.model);
  }
  render(container, className) {
    this.view.render(container, className);
  }
}
