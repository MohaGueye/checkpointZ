import { NoDiscountStrategy } from './pricing/discount-strategy.js';

export class ShoppingCart {
  constructor(discountStrategy = new NoDiscountStrategy()) {
    this.items = [];
    this.discountStrategy = discountStrategy;
  }

  addItem(product, quantity = 1) {
    if (!product || !product.id) {
      throw new Error('A valid product is required.');
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer.');
    }

    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    }

    const item = {
      product,
      quantity,
    };

    this.items.push(item);
    return item;
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  updateDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  subtotal() {
    return this.items.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);
  }

  discountAmount() {
    return this.discountStrategy.calculate(this.subtotal());
  }

  total() {
    return this.subtotal() - this.discountAmount();
  }

  receipt() {
    return {
      items: this.items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.basePrice,
        lineTotal: item.product.basePrice * item.quantity,
      })),
      subtotal: this.subtotal(),
      discount: this.discountAmount(),
      total: this.total(),
    };
  }
}
