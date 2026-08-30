import StringSchema from './stringSchema.js';
import NumberSchema from './numberSchema.js';
import ArraySchema from './arraySchema.js';

class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }

  array() {
    return new ArraySchema();
  }
}

export default Validator;
