import { fetchData } from "../utils/fetchData.js";

import { FiltersManager } from "../managers/FiltersManager.js";
import { FilterModel } from "../models/FilterModel.js";
import { FilterView } from "../views/FilterView.js";
import { FilterController } from "../controllers/FilterController.js";
import { TagsManager } from "../managers/TagsManager.js";
import { TagView } from "../views/TagView.js";
import { TagController } from "../controllers/TagController.js";

function renderFilters(data) {
  const filtersContainer = document.querySelector(".filters");
  const activeFiltersContainer = document.querySelector(".active-filters");

  const filtersManager = new FiltersManager();
  const tagsManager = new TagsManager();

  for (const item of data) {
    const model = new FilterModel(item);
    const view = new FilterView({
      model,
      className: "filter",
      container: filtersContainer,
    });
    const controller = new FilterController({
      model,
      view,
    });
    filtersManager.addFilter(controller);
  }
  filtersManager.sortFilters();
  filtersManager.render(filtersContainer);

  document.addEventListener("addTag", (e) => {
    const model = new FilterModel(e.detail);
    const view = new TagView({
      model,
      className: "active-filter",
      container: activeFiltersContainer,
    });
    const controller = new TagController({
      model,
      view,
    });
    tagsManager.addTag(controller);
    tagsManager.sortTags();
    tagsManager.render(activeFiltersContainer);
    filtersManager.removeFilter(e.detail.name);
  });

  document.addEventListener("addFilter", (e) => {
    const model = new FilterModel(e.detail);
    const view = new FilterView({
      model,
      className: "filter",
      container: filtersContainer,
    });
    const controller = new FilterController({
      model,
      view,
    });
    filtersManager.addFilter(controller);
    filtersManager.sortFilters();
    filtersManager.render(filtersContainer);
    tagsManager.removeTag(e.detail.name);
  });
}

fetchData().then((data) => {
  renderFilters(data);
});
