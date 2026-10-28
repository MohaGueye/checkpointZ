# Refactored Shopping Cart System

This repository contains a clean, modular shopping cart application built as a refactoring exercise. It demonstrates how to move from a rough, tightly coupled implementation toward maintainable code using code-smell fixes and design patterns.

## Project goal

The application models a small e-commerce workflow:
- products with prices, descriptions, and inventory
- a shopping cart that adds items and calculates totals
- discount strategies for pricing
- price-drop notifications for customers
- a builder for constructing complex product objects

## Iteration history

### Iteration 1: Baseline structure
- Big responsibilities were concentrated in a few objects.
- Naming was inconsistent and duplicated logic existed.
- Price and cart logic were tightly coupled to execution flow.

### Iteration 2: Extract responsibilities
- Product creation was separated into a builder.
- Cart logic was isolated from pricing rules.
- Revenue logic was moved into dedicated strategy classes.

### Iteration 3: Add design patterns
- Strategy pattern for discounts.
- Observer pattern for price-drop alerts.
- Builder pattern for product creation.

### Iteration 4: Clean code hardening
- Small, focused methods.
- Validation for invalid inputs.
- Reusable modules with obvious boundaries.

## Key design decisions

### Strategy pattern
Discounts are implemented through classes that share a single `calculate` contract. This keeps pricing logic replaceable without changing the cart flow.

### Observer pattern
Price-drop events are published to observers, allowing user alerts or analytics listeners to react without the product or cart knowing about specific integrations.

### Builder pattern
Creating a product with optional metadata, tags, and stock requires many arguments. The builder makes the product configuration readable and safer.

## Running the app

```bash
npm install
npm start
```

## Running tests

```bash
npm test
```

## Summary report

### What changed and why
- The original code smell of duplicated price logic was removed by centralizing pricing in strategy classes.
- The cart now focuses on item management and totals, rather than performing discount calculations inline.
- Product creation was simplified with a builder to avoid long argument lists and invalid object states.
- Observers decouple price updates from customer notifications.

### Clean code principles applied
- Small methods with single responsibilities.
- Clear naming for classes and methods.
- Validation before constructing objects.
- Cohesion by domain: cart, discounts, notifications, and domain objects live in separate modules.
- Reusable abstractions rather than copy-pasted logic.

### Pattern improvements
- Strategy allows any pricing rule to plug into the cart without rewriting the cart itself.
- Observer allows multiple notifications without tightly coupling the cart to customer code.
- Builder makes product configuration maintainable and more extensible as requirements grow.

## Project structure

```text
src/
  cart.js
  index.js
  domain/
    product.js
    product-builder.js
  notifications/
    price-drop-observer.js
  pricing/
    discount-strategy.js
```
