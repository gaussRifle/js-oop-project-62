import StringSchema from './stringSchema.js';
import NumberSchema from './numberSchema.js';
import ArraySchema from './arraySchema.js';
import ObjectSchema from './objectSchema';

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

  object() {
    return new ObjectSchema();
  }
}

export default Validator;
