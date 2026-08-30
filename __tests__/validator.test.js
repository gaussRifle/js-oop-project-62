import { expect, test } from 'vitest';
import validator from '../index.js';

test('validator not required', () => {
  const schema = validator.string();

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

  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(
    schema.contains('whatthe').isValid('what does the fox say'),
  ).toBeFalsy();
  expect(schema.isValid('what does the fox say')).toBeFalsy();
});

test('validator minLength', () => {
  const schema = validator.string().required();

  expect(schema.minLength(10).minLength(4).isValid('Hexlet')).toBeTruthy();
});
