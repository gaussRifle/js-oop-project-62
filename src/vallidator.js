import StringSchema from './stringSchema.js';
import NumberSchema from './numberSchema.js';

class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }
}

export default Validator;
