export default class FilterView {
  constructor(model) {
    this.model = model;
  }
  create(className) {
    const item = document.createElement("li");
    item.classList.add(className);

    const name = document.createElement("p");
    name.classList.add(`${className}__name`);
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
  render(container, className) {
    const item = this.create(className);
    container.appendChild(item);
  }
}
