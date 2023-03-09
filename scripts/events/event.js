import {
  createTagController,
  createFilterController,
} from "../utils/createController.js";

function addTagEvent(tagsManager, filtersManager, activeFiltersContainer) {
  document.addEventListener("addTag", (e) => {
    const controller = createTagController(
      e.detail,
      activeFiltersContainer,
      "tag"
    );
    tagsManager.addTag(controller);
    tagsManager.sortTags();
    tagsManager.render(activeFiltersContainer);
    filtersManager.removeFilter(e.detail.name);
  });
}

function addFilterEvent(tagsManager, filtersManager, filtersContainer) {
  document.addEventListener("addFilter", (e) => {
    const controller = createFilterController(
      e.detail,
      filtersContainer,
      "filter"
    );
    filtersManager.addFilter(controller);
    filtersManager.sortFilters();
    filtersManager.render(filtersContainer);
    tagsManager.removeTag(e.detail.name);
  });
}

export { addTagEvent, addFilterEvent };
