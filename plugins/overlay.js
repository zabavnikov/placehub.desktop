import Vue from 'vue';

class Overlay {
  static id = 'overlay-container';

  constructor() {
    this.overlayInstance = null;
  }

  show(component, data) {
    if (! Overlay.isOverlayContainerExists()) {
      this.overlayInstance = Vue.extend({
        render: (h) => h(component, data),
      });

      this.overlayInstance = new this.overlayInstance().$mount();

      Overlay.createOverlayContainer()
          .appendChild(this.overlayInstance.$el);
    } else {
      this.hide();
    }
  }

  hide() {
    document.body.removeChild(Overlay.getOverlayContainer());
    this.overlayInstance = null;
  }

  static createOverlayContainer() {
    const overlayContainer = document.createElement('div');
    overlayContainer.setAttribute('id', Overlay.id);
    document.body.appendChild(overlayContainer);

    return overlayContainer;
  }

  static getOverlayContainer() {
    return document.getElementById(Overlay.id);
  }

  static isOverlayContainerExists() {
    return Overlay.getOverlayContainer() !== null;
  }
}

export default (ctx, inject) => {
  inject('overlay', new Overlay())
}