export class FilterModel {
  constructor(data) {
    this.name = data.name.toLowerCase();
    this.type = data.type;
  }
}
