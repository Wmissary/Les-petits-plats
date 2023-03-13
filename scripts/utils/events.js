import TagController from "../controllers/TagController.js";

function addTagEvent(tagManager, tagConfig) {
  document.addEventListener("addTag", (e) => {
    const tagController = new TagController(e.detail);
    tagManager.add(tagController);
    tagManager.render(tagConfig.container, tagConfig.className);
  });
}

function removeTagEvent(tagManager, tagConfig) {
  document.addEventListener("removeTag", (e) => {
    tagManager.remove(e.detail.name);
    tagManager.render(tagConfig.container, tagConfig.className);
  });
}

function addFilterEvent(filtersManagers, filtersConfig) {
  document.addEventListener("addFilter", (e) => {
    filtersManagers[e.detail.type].show(e.detail.name);
    filtersManagers[e.detail.type].render(
      filtersConfig[e.detail.type].container,
      filtersConfig[e.detail.type].className
    );
  });
}

function removeFilterEvent(filtersManagers, filtersConfig) {
  document.addEventListener("removeFilter", (e) => {
    filtersManagers[e.detail.type].hide(e.detail.name);
    filtersManagers[e.detail.type].render(
      filtersConfig[e.detail.type].container,
      filtersConfig[e.detail.type].className
    );
  });
}

export { addTagEvent, removeTagEvent, addFilterEvent, removeFilterEvent };
