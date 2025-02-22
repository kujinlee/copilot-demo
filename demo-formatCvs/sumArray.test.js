const { sumArray } = require('./sumArray');

test('sumArray should return the sum of all elements in the array', () => {
    expect(sumArray([1, 2, 3, 4])).toBe(10);
    expect(sumArray([0, 0, 0, 0])).toBe(0);
    expect(sumArray([-1, -2, -3, -4])).toBe(-10);
    expect(sumArray([1])).toBe(1);
    expect(sumArray([])).toBe(0);
});
