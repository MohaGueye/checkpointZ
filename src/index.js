import { ProductBuilder } from './domain/product-builder.js';
import { ShoppingCart } from './cart.js';
import { PercentageDiscountStrategy } from './pricing/discount-strategy.js';
import { PriceDropSubject, EmailAlertObserver } from './notifications/price-drop-observer.js';

const product = new ProductBuilder()
  .withId('sku-1001')
  .withName('Noise Cancelling Headphones')
  .withCategory('Electronics')
  .withPrice(180)
  .withStock(12)
  .withDescription('Wireless headphones with active noise cancellation.')
  .addTag('audio')
  .addTag('wireless')
  .build();

const cart = new ShoppingCart(new PercentageDiscountStrategy(10));
cart.addItem(product, 2);

const receipt = cart.receipt();
console.log('Shopping Cart Receipt');
console.log(JSON.stringify(receipt, null, 2));

const subject = new PriceDropSubject();
const customerAlert = new EmailAlertObserver('customer@example.com');
subject.subscribe(customerAlert);
subject.notify(product, 180, 149);
console.log('Price drop notification:', JSON.stringify(customerAlert.update(product, 180, 149), null, 2));
