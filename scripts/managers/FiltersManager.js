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
    this.sort();
    for (const filter of this.showedFilters) {
      filter.render(container, className);
    }
  }

  search(string) {
    this.showedFilters = this.filters.filter((i) =>
      i.model.name.toLowerCase().includes(string.toLowerCase())
    );
  }

  reset() {
    this.showedFilters = this.filters;
  }
}
