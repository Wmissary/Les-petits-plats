export class RecipeView {
  constructor({ model, className, container }) {
    this.model = model;
    this.className = className;
    this.container = container;
  }
  create() {
    const card = document.createElement("section");
    card.classList.add(this.className);

    const cardHeader = document.createElement("header");
    cardHeader.classList.add(`${this.className}__header`);

    const cardImage = document.createElement("img");
    cardImage.classList.add(`${this.className}__image`);

    const cardBody = document.createElement("div");
    cardBody.classList.add(`${this.className}__body`);

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add(`${this.className}__title`);
    cardTitle.textContent = this.model.name;

    const cardTimer = document.createElement("div");
    cardTimer.classList.add(`${this.className}__timer`);

    const cardTimerIcon = document.createElement("i");
    cardTimerIcon.classList.add("far", "fa-clock");

    const cardTimerText = document.createElement("p");
    cardTimerText.classList.add(`${this.className}__timer-text`);
    cardTimerText.textContent = `${this.model.time} min`;

    const cardIngredients = document.createElement("ul");
    cardIngredients.classList.add(`${this.className}__ingredients`);

    for (const ingredient of this.model.ingredients) {
      const cardIngredient = document.createElement("li");
      cardIngredient.classList.add(`${this.className}__ingredient`);
      cardIngredient.textContent = `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`;
      cardIngredients.appendChild(cardIngredient);
    }

    const cardDescription = document.createElement("p");
    cardDescription.classList.add(`${this.className}__description`);
    cardDescription.textContent = this.model.description;

    card.appendChild(cardHeader);
    cardHeader.appendChild(cardImage);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardTimer);
    cardTimer.appendChild(cardTimerIcon);
    cardTimer.appendChild(cardTimerText);
    cardBody.appendChild(cardIngredients);
    cardBody.appendChild(cardDescription);

    return card;
  }
  render() {
    const card = this.create();
    this.container.appendChild(card);
  }
}
