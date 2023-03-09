export class FiltersManager {
  constructor() {
    this.filters = new Set([]);
  }
  addFilter(filter) {
    if (
      ![...this.filters].some(
        (f) =>
          f.model.name === filter.model.name ||
          f.model.name === filter.model.name.slice(0, -1)
      )
    ) {
      this.filters.add(filter);
    }
  }
  removeFilter(filterName) {
    this.filters = new Set(
      [...this.filters].filter((filter) => filter.model.name !== filterName)
    );
  }
  sortFilters() {
    this.filters = new Set(
      [...this.filters].sort((a, b) => {
        return a.model.name.localeCompare(b.model.name);
      })
    );
  }
  render(container) {
    container.innerHTML = "";
    for (const filter of this.filters) {
      filter.render();
    }
  }
}
