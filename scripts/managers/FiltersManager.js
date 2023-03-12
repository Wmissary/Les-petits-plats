export default class FiltersManager {
  constructor() {
    this.filters = [];
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
    }
  }
  remove(name) {
    this.filters = this.filters.filter((i) => i.model.name !== name);
  }
  sort() {
    this.filters = this.filters.sort((a, b) => {
      return a.model.name.localeCompare(b.model.name);
    });
  }
  render(container, className) {
    container.innerHTML = "";
    for (const filter of this.filters) {
      filter.render(container, className);
    }
  }
}
