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



 //   constructor(obj, container) {
  //     this._items = obj.items;
  //     this._renderer = obj.renderer;
  //     this._container = container;
  //   }
  //   addItem(element) {
  //     this._container.append(element);
  //   }
  //   renderItems() {
  //     this._items.forEach((item) => {
  //       this.addItem(this._renderer(item));
  //     });
  //   }
  // }

  // constructor(obj, container) {
  //   this._items = obj.items;
  //   this._renderer = obj.renderer;
  //   this._container = container;
  // }

  // renderItems() {
  //   this._items.forEach((item) => {
  //     this.renderer(item);
  //   });
  // }

  // renderItems() {
  //   cardsData.forEach(card => {
  //     this._renderer(card);
  //   }