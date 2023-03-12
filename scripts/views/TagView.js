export default class TagView {
  constructor(model) {
    this.model = model;
  }
  create(className) {
    const item = document.createElement("li");
    item.classList.add(className);
    item.classList.add(`${className}--${this.model.type}`);

    const name = document.createElement("p");
    name.classList.add(`${className}__name`);
    name.textContent = this.model.name;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add(`${className}__button`);

    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fas");
    removeIcon.classList.add("fa-times");
    removeIcon.classList.add(`${className}__icon`);

    removeBtn.appendChild(removeIcon);

    item.appendChild(name);
    item.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
      const addFilterEvent = new CustomEvent("addFilter", {
        detail: {
          name: this.model.name,
          type: this.model.type,
        },
      });
      document.dispatchEvent(addFilterEvent);
      item.remove();
    });
    return item;
  }
  render(container, className) {
    const item = this.create(className);
    container.appendChild(item);
  }
}
