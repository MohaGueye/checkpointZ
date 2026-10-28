export class PriceDropSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    if (!observer || typeof observer.update !== 'function') {
      throw new Error('Observer must implement update(product, oldPrice, newPrice).');
    }

    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((entry) => entry !== observer);
  }

  notify(product, oldPrice, newPrice) {
    for (const observer of this.observers) {
      observer.update(product, oldPrice, newPrice);
    }
  }
}

export class EmailAlertObserver {
  constructor(email) {
    this.email = email;
  }

  update(product, oldPrice, newPrice) {
    return {
      email: this.email,
      productId: product.id,
      productName: product.name,
      oldPrice,
      newPrice,
      message: `Price drop alert sent to ${this.email} for ${product.name}.`,
    };
  }
}
