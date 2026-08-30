class BaseSchema {
  constructor(schema = {}, customValidators = {}) {
    this.schema = schema;
    this.customValidators = customValidators;
  }

  required() {
    this.schema.requiredRule = (value) =>
      value !== null && value !== undefined && value !== '';

    return this;
  }

  test(name, ...args) {
    const fn = this.customValidators[name];
    if (!fn) {
      throw new Error(`Unknown validator: ${name}`);
    }
    return this.addCheck(name, (value) => fn(value, ...args));
  }
}

export default BaseSchema;
