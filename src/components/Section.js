export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element, place = 'prepend') {
    if (place === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  };
}
