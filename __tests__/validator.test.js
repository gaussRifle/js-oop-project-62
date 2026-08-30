import { expect, test, describe } from 'vitest';
import Validator from '../index.js';

const validator = new Validator();

describe('string validation', () => {
  const schema = validator.string();

  test('validator not required', () => {
    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
  });

  test('validator required', () => {
    const schema = validator.string().required();

    expect(schema.isValid('what does the fox say')).toBeTruthy();
    expect(schema.isValid('hexlet')).toBeTruthy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid(undefined)).toBeFalsy();
  });

  test('validator required contains', () => {
    const schema = validator.string().required();

    expect(
      schema.contains('what').isValid('what does the fox say'),
    ).toBeTruthy();
    expect(
      schema.contains('whatthe').isValid('what does the fox say'),
    ).toBeFalsy();
    expect(schema.isValid('what does the fox say')).toBeFalsy();
  });

  test('validator minLength', () => {
    const schema = validator.string().required();

    expect(schema.minLength(10).minLength(4).isValid('Hexlet')).toBeTruthy();
  });
});

describe('number validation', () => {
  test('validator not required', () => {
    const schema = validator.number();

    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
  });

  test('validator required', () => {
    const schema = validator.number().required();

    expect(schema.isValid(7)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid('')).toBeFalsy();
  });

  test('validator positive', () => {
    const schema = validator.number().positive();

    expect(schema.isValid(0)).toBeFalsy();
    expect(schema.isValid(7)).toBeTruthy();
    expect(schema.isValid(-1)).toBeFalsy();
    expect(schema.isValid(-3)).toBeFalsy();
    expect(schema.isValid(10)).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
  });

  test('validator range', () => {
    const schema = validator.number().range(-6, 10);

    expect(schema.isValid(0)).toBeTruthy();
    expect(schema.isValid(7)).toBeTruthy();
    expect(schema.isValid(-11)).toBeFalsy();
    expect(schema.isValid(-31)).toBeFalsy();
    expect(schema.isValid(10)).toBeTruthy();
  });
});

describe('number validation', () => {
  test('validator not required', () => {
    const schema = validator.array();

    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
  });

  test('validator required', () => {
    const schema = validator.array().required();

    expect(schema.isValid([])).toBeTruthy();
    expect(schema.isValid([2])).toBeTruthy();
    expect(schema.isValid(undefined)).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid('')).toBeFalsy();
  });

  test('validator sizeof', () => {
    const schema = validator.array().sizeof(2);

    expect(schema.isValid([2, 1])).toBeTruthy();
    expect(schema.isValid([2])).toBeFalsy();
  });
});

describe('object validation', () => {
  test('object', () => {
    const schema = validator.object();

    schema.shape({
      name: validator.string().required(),
      age: validator.number().positive(),
    });

    expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
    expect(schema.isValid({ name: 'maya', age: null })).toBeFalsy();
    expect(schema.isValid({ name: '', age: null })).toBeFalsy();
    expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();
  });
});

describe('addValidator', () => {
  test('addValidator', () => {
    const fn = (value, start) => value.startsWith(start);
    validator.addValidator('string', 'startWith', fn);

    const schema3 = validator.string().test('startWith', 'H');

    expect(schema3.isValid('exlet')).toBeFalsy();
    expect(schema3.isValid('Hexlet')).toBeTruthy();

    const fnMin = (value, min) => value >= min;
    validator.addValidator('number', 'min', fnMin);

    const schema4 = validator.number().test('min', 5);

    expect(schema4.isValid(4)).toBeFalsy();
    expect(schema4.isValid(6)).toBeTruthy();
  });
});
