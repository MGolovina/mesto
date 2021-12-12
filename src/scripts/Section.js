export default class Section {
  constructor(obj, container) {
    this._items = obj.items;
    this._renderer = obj.renderer;
    this._container = container;
  }
  addItem(element) {
    this._container.append(element);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    })
  }
}