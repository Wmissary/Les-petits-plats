import FilterModel from "../models/FilterModel.js";
import FilterView from "../views/FilterView.js";

export default class FilterController {
  constructor(data) {
    this.model = new FilterModel(data);
    this.view = new FilterView(this.model);
  }
  render(container, className) {
    this.view.render(container, className);
  }
}
