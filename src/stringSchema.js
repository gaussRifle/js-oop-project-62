import BaseSchema from './baseSchema';

class StringSchema extends BaseSchema {
  minLength(length) {
    this.schema.minLengthRule = (value) => value.length >= length;

    return new StringSchema(this.schema);
  }

  contains(str) {
    this.schema.containsRule = (value) => value.includes(str);

    return new StringSchema(this.schema);
  }

  isValid(value) {
    if (this.schema.requiredRule && !this.schema.requiredRule(value)) {
      return false;
    }

    if (this.schema.minLengthRule && !this.schema.minLengthRule(value)) {
      return false;
    }

    if (this.schema.containsRule && !this.schema.containsRule(value)) {
      return false;
    }

    return true;
  }
}

export default StringSchema;
