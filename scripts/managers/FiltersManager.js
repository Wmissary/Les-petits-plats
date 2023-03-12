export default class FiltersManager {
  constructor() {
    this.filters = [];
    this.showedFilters = [];
  }
  add(filter) {
    if (
      !this.filters.find(
        (i) =>
          i.model.name === filter.model.name ||
          i.model.name === filter.model.name.slice(0, -1)
      )
    ) {
      this.filters.push(filter);
      this.showedFilters.push(filter);
    }
  }
  remove(name) {
    this.filters = this.filters.filter((i) => i.model.name !== name);
  }

  show(name) {
    const filter = this.filters.find((i) => i.model.name === name);
    this.showedFilters.push(filter);
  }

  hide(name) {
    this.showedFilters = this.showedFilters.filter(
      (i) => i.model.name !== name
    );
  }

  sort() {
    this.showedFilters = this.showedFilters.sort((a, b) => {
      return a.model.name.localeCompare(b.model.name);
    });
  }

  render(container, className) {
    container.innerHTML = "";
    for (const filter of this.showedFilters) {
      filter.render(container, className);
    }
  }
}
