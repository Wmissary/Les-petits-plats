export default class TagsManager {
  constructor() {
    this.tags = [];
  }
  add(tag) {
    if (
      !this.tags.find(
        (i) =>
          i.model.name === tag.model.name ||
          i.model.name === tag.model.name.slice(0, -1)
      )
    ) {
      this.tags.push(tag);
    }
  }
  remove(name) {
    this.tags = this.tags.filter((i) => i.model.name !== name);
  }
  sort() {
    this.tags = this.tags.sort((a, b) => {
      return a.model.name.localeCompare(b.model.name);
    });
  }
  render(container, className) {
    container.innerHTML = "";
    for (const filter of this.tags) {
      filter.render(container, className);
    }
  }
}
