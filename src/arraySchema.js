import BaseSchema from './baseSchema';

class ArraySchema extends BaseSchema {
  sizeof(length) {
    this.schema.sizeofRule = (value) =>
      Array.isArray(value) && value.length === length;

    return new ArraySchema(this.schema);
  }

  isValid(value) {
    if (this.schema.requiredRule && !this.schema.requiredRule(value)) {
      return false;
    }

    if (this.schema.sizeofRule && !this.schema.sizeofRule(value)) {
      return false;
    }

    return true;
  }
}

export default ArraySchema;
