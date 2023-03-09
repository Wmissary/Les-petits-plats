export class FilterView {
  constructor(data) {
    this.model = data.model;
    this.className = data.className;
    this.container = data.container;
  }
  create() {
    const item = document.createElement("li");
    item.classList.add(this.className);

    const name = document.createElement("p");
    name.classList.add(`${this.className}__name`);
    name.textContent = this.model.name;

    item.appendChild(name);

    item.addEventListener("click", () => {
      const addTagEvent = new CustomEvent("addTag", {
        detail: {
          name: this.model.name,
          type: this.model.type,
        },
      });
      document.dispatchEvent(addTagEvent);
      item.remove();
    });
    return item;
  }
  render() {
    const item = this.create();
    this.container.appendChild(item);
  }
}
