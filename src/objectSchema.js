class ObjectSchema {
  constructor(schema = {}) {
    this.schema = schema;
  }

  shape(schema) {
    this.schema = schema;
  }

  isValid(obj) {
    let isValid = true;

    for (const key in this.schema) {
      const innerSchema = this.schema[key];

      isValid = innerSchema.isValid(obj[key]);
    }

    return isValid;
  }
}

export default ObjectSchema;
