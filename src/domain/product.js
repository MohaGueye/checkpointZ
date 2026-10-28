export class Product {
  constructor({
    id,
    name,
    basePrice,
    category = 'General',
    stock = 0,
    description = '',
    tags = [],
  }) {
    this.id = id;
    this.name = name;
    this.basePrice = Number(basePrice);
    this.category = category;
    this.stock = Number(stock);
    this.description = description;
    this.tags = [...tags];

    if (!this.id) {
      throw new Error('Product id is required.');
    }

    if (!this.name) {
      throw new Error('Product name is required.');
    }

    if (!Number.isFinite(this.basePrice) || this.basePrice < 0) {
      throw new Error('Product price must be a valid non-negative number.');
    }
  }
}
