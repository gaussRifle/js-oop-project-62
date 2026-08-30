import StringSchema from './stringSchema.js';
import NumberSchema from './numberSchema.js';
import ArraySchema from './arraySchema.js';
import ObjectSchema from './objectSchema';

class Validator {
  constructor(customValidators = {}) {
    this.customValidators = customValidators;
  }

  string() {
    return new StringSchema({}, this.customValidators.string || {});
  }

  number() {
    return new NumberSchema({}, this.customValidators.number || {});
  }

  array() {
    return new ArraySchema({}, this.customValidators.array || {});
  }

  object() {
    return new ObjectSchema({}, this.customValidators.object || {});
  }

  addValidator(type, name, fn) {
    if (!this.customValidators[type]) {
      this.customValidators[type] = {};
    }
    this.customValidators[type][name] = fn;
  }
}

export default Validator;
