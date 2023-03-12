export default class RecipeView {
  constructor(model) {
    this.model = model;
  }
  create(className) {
    const card = document.createElement("section");
    card.classList.add(className);

    const cardHeader = document.createElement("header");
    cardHeader.classList.add(`${className}__header`);

    const cardImage = document.createElement("img");
    cardImage.classList.add(`${className}__image`);

    const cardBody = document.createElement("div");
    cardBody.classList.add(`${className}__body`);

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add(`${className}__title`);
    cardTitle.textContent = this.model.name;

    const cardTimer = document.createElement("div");
    cardTimer.classList.add(`${className}__timer`);

    const cardTimerIcon = document.createElement("i");
    cardTimerIcon.classList.add("far", "fa-clock");

    const cardTimerText = document.createElement("p");
    cardTimerText.classList.add(`${className}__timer-text`);
    cardTimerText.textContent = `${this.model.time} min`;

    const cardIngredients = document.createElement("ul");
    cardIngredients.classList.add(`${className}__ingredients`);

    for (const ingredient of this.model.ingredients) {
      const cardIngredient = document.createElement("li");
      cardIngredient.classList.add(`${className}__ingredient`);
      cardIngredient.textContent = `${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`;
      cardIngredients.appendChild(cardIngredient);
    }

    const cardDescription = document.createElement("p");
    cardDescription.classList.add(`${className}__description`);
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
  render(container, className) {
    const card = this.create(className);
    container.appendChild(card);
  }
}
