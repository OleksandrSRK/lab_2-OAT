import {
  getMilliseconds,
  getTime,
  getTimezoneOffset
} from '../util/functions.js';

describe('getMilliseconds', () => {
  test('0 мс', () => {
    expect(getMilliseconds(new Date('2026-01-01T00:00:00.000Z'))).toBe(0);
  });

  test('123 мс', () => {
    expect(getMilliseconds(new Date('2026-01-01T00:00:00.123Z'))).toBe(123);
  });

  test('999 мс', () => {
    expect(getMilliseconds(new Date('2026-01-01T00:00:00.999Z'))).toBe(999);
  });

  test('мале значення', () => {
    expect(getMilliseconds(new Date('2026-01-01T12:00:00.005Z'))).toBe(5);
  });

  test('тип number', () => {
    expect(typeof getMilliseconds(new Date())).toBe('number');
  });
});


describe('getTime', () => {
  test('epoch', () => {
    expect(getTime(new Date('1970-01-01T00:00:00.000Z'))).toBe(0);
  });

  test('звичайна дата', () => {
    expect(getTime(new Date('2026-01-01T00:00:00.000Z')))
      .toBe(Date.parse('2026-01-01T00:00:00.000Z'));
  });

  test('тип number', () => {
    expect(typeof getTime(new Date())).toBe('number');
  });

  test('від’ємне значення', () => {
    expect(getTime(new Date('1969-12-31T23:59:59.000Z'))).toBe(-1000);
  });

  test('однакові дати', () => {
    const d1 = new Date('2026-05-04T10:00:00Z');
    const d2 = new Date('2026-05-04T10:00:00Z');
    expect(getTime(d1)).toBe(getTime(d2));
  });
});


describe('getTimezoneOffset', () => {
  test('звичайне значення', () => {
    const d = new Date();
    expect(typeof getTimezoneOffset(d)).toBe('number');
  });

  test('mock 180', () => {
    const d = { getTimezoneOffset: jest.fn(() => 180) };
    expect(getTimezoneOffset(d)).toBe(180);
  });

  test('mock 0', () => {
    const d = { getTimezoneOffset: jest.fn(() => 0) };
    expect(getTimezoneOffset(d)).toBe(0);
  });

  test('mock від’ємне', () => {
    const d = { getTimezoneOffset: jest.fn(() => -120) };
    expect(getTimezoneOffset(d)).toBe(-120);
  });

  test('перевірка виклику', () => {
    const d = { getTimezoneOffset: jest.fn(() => 60) };
    getTimezoneOffset(d);
    expect(d.getTimezoneOffset).toHaveBeenCalled();
  });
});

