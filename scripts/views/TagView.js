export class TagView {
  constructor(data) {
    this.model = data.model;
    this.className = data.className;
    this.container = data.container;
  }
  create() {
    const item = document.createElement("li");
    item.classList.add(this.className);
    item.classList.add(`${this.className}--${this.model.type}`);

    const name = document.createElement("p");
    name.classList.add(`${this.className}__name`);
    name.textContent = this.model.name;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add(`${this.className}__button`);

    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fas");
    removeIcon.classList.add("fa-times");
    removeIcon.classList.add(`${this.className}__icon`);

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
  render() {
    const item = this.create();
    this.container.appendChild(item);
  }
}
