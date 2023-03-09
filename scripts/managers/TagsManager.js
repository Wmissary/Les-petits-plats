export class TagsManager {
  constructor() {
    this.tags = new Set([]);
  }
  addTag(tag) {
    if (![...this.tags].some((t) => t.model.name === tag.model.name)) {
      this.tags.add(tag);
    }
  }
  removeTag(tagName) {
    this.tags = new Set(
      [...this.tags].filter((tag) => tag.model.name !== tagName)
    );
  }
  sortTags() {
    this.tags = new Set(
      [...this.tags].sort((a, b) => {
        return a.model.name.localeCompare(b.model.name);
      })
    );
  }
  render(container) {
    container.innerHTML = "";
    for (const tag of this.tags) {
      tag.render();
    }
  }
}
