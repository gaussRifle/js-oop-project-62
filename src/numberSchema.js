import BaseSchema from './baseSchema';

class NumberSchema extends BaseSchema {
  positive() {
    this.schema.positiveRule = (value) => value > 0;

    return new NumberSchema(this.schema);
  }

  range(left, right) {
    this.schema.rangeRule = (value) => value >= left && value <= right;

    return new NumberSchema(this.schema);
  }

  isValid(value) {
    if (this.schema.requiredRule && !this.schema.requiredRule(value)) {
      return false;
    }

    if (this.schema.positiveRule && !this.schema.positiveRule(value)) {
      return false;
    }

    if (this.schema.rangeRule && !this.schema.rangeRule(value)) {
      return false;
    }

    return true;
  }
}

export default NumberSchema;
