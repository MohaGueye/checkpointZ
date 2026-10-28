import { Product } from './product.js';

export class ProductBuilder {
  constructor() {
    this.id = '';
    this.name = '';
    this.basePrice = 0;
    this.category = 'General';
    this.stock = 0;
    this.description = '';
    this.tags = [];
  }

  withId(id) {
    this.id = id;
    return this;
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withPrice(basePrice) {
    this.basePrice = basePrice;
    return this;
  }

  withCategory(category) {
    this.category = category;
    return this;
  }

  withStock(stock) {
    this.stock = stock;
    return this;
  }

  withDescription(description) {
    this.description = description;
    return this;
  }

  addTag(tag) {
    this.tags.push(tag);
    return this;
  }

  build() {
    return new Product({
      id: this.id,
      name: this.name,
      basePrice: this.basePrice,
      category: this.category,
      stock: this.stock,
      description: this.description,
      tags: this.tags,
    });
  }
}
