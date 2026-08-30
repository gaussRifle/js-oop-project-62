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
    this.schema.customRules = this.schema.customRules || [];
    this.schema.customRules.push({ name, args });

    return this;
  }

  checkCustomRules(value) {
    if (!this.schema.customRules) {
      return true;
    }

    return this.schema.customRules.every(({ name, args }) => {
      const fn = this.customValidators[name];
      return typeof fn === 'function' ? fn(value, ...args) : true;
    });
  }
}

export default BaseSchema;
