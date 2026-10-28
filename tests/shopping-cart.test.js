import test from 'node:test';
import assert from 'node:assert/strict';

import { ProductBuilder } from '../src/domain/product-builder.js';
import { ShoppingCart } from '../src/cart.js';
import { PercentageDiscountStrategy, FlatDiscountStrategy } from '../src/pricing/discount-strategy.js';
import { PriceDropSubject, EmailAlertObserver } from '../src/notifications/price-drop-observer.js';

test('cart adds items and applies percentage discount', () => {
  const product = new ProductBuilder()
    .withId('sku-1')
    .withName('Laptop Stand')
    .withPrice(100)
    .withStock(10)
    .build();

  const cart = new ShoppingCart(new PercentageDiscountStrategy(10));
  cart.addItem(product, 2);

  const result = cart.receipt();

  assert.equal(result.subtotal, 200);
  assert.equal(result.discount, 20);
  assert.equal(result.total, 180);
});

test('flat discount does not exceed subtotal', () => {
  const product = new ProductBuilder()
    .withId('sku-2')
    .withName('Keyboard')
    .withPrice(50)
    .build();

  const cart = new ShoppingCart(new FlatDiscountStrategy(75));
  cart.addItem(product, 2);

  const result = cart.receipt();

  assert.equal(result.subtotal, 100);
  assert.equal(result.discount, 75);
  assert.equal(result.total, 25);
});

test('builder creates a valid product with tags', () => {
  const product = new ProductBuilder()
    .withId('sku-3')
    .withName('Coffee Grinder')
    .withPrice(80)
    .withCategory('Kitchen')
    .addTag('home')
    .addTag('kitchen')
    .build();

  assert.equal(product.tags.length, 2);
  assert.equal(product.category, 'Kitchen');
  assert.equal(product.basePrice, 80);
});

test('observer receives price drop updates', () => {
  const product = new ProductBuilder()
    .withId('sku-4')
    .withName('Smart Watch')
    .withPrice(200)
    .build();

  const subject = new PriceDropSubject();
  const alert = new EmailAlertObserver('watcher@example.com');
  subject.subscribe(alert);
  const notification = alert.update(product, 200, 150);

  assert.equal(notification.productName, 'Smart Watch');
  assert.equal(notification.oldPrice, 200);
  assert.equal(notification.newPrice, 150);
  assert.equal(notification.email, 'watcher@example.com');

  subject.notify(product, 200, 150);
});
