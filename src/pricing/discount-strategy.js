export class DiscountStrategy {
  calculate(totalPrice) {
    return totalPrice;
  }
}

export class NoDiscountStrategy extends DiscountStrategy {
  calculate() {
    return 0;
  }
}

export class PercentageDiscountStrategy extends DiscountStrategy {
  constructor(percent) {
    super();
    this.percent = percent;
  }

  calculate(totalPrice) {
    if (!Number.isFinite(totalPrice) || totalPrice < 0) {
      return 0;
    }

    return totalPrice * (this.percent / 100);
  }
}

export class FlatDiscountStrategy extends DiscountStrategy {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  calculate(totalPrice) {
    if (!Number.isFinite(totalPrice) || totalPrice < 0) {
      return 0;
    }

    return Math.min(totalPrice, this.amount);
  }
}

export class TieredDiscountStrategy extends DiscountStrategy {
  constructor(threshold, percent) {
    super();
    this.threshold = threshold;
    this.percent = percent;
  }

  calculate(totalPrice) {
    if (!Number.isFinite(totalPrice) || totalPrice < 0) {
      return 0;
    }

    if (totalPrice < this.threshold) {
      return 0;
    }

    return totalPrice * (this.percent / 100);
  }
}
