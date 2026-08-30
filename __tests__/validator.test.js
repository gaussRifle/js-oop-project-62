import { expect, test, describe } from 'vitest';
import validator from '../index.js';

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
