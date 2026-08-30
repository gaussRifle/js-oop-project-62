import BaseSchema from './baseSchema';

class ObjectSchema extends BaseSchema {
  shape(schema) {
    this.schema = schema;
  }

  isValid(obj) {
    let isValid = true;

    for (const key in this.schema) {
      const innerSchema = this.schema[key];

      isValid = innerSchema.isValid(obj[key]);

      if (!isValid) break;
    }

    return isValid;
  }
}

export default ObjectSchema;
