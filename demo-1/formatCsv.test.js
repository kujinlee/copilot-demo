import fs from 'fs';
import { formatCsv, formatCsvStreaming } from './formatCsv';

const inputCsv = 'input.csv';
const outputCsv = 'output.csv';

describe('formatCsv', () => {
  beforeAll(() => {
    // Create a sample input CSV file
    fs.writeFileSync(inputCsv, 'name,age,city\nJohn Doe,30,New York\nJane Smith,25,Los Angeles');
  });

  afterAll(() => {
    // Clean up the output CSV file
    fs.unlinkSync(inputCsv);
    fs.unlinkSync(outputCsv);
  });

  test('should format CSV data correctly', (done) => {
    formatCsv(inputCsv, outputCsv);

    const checkOutput = () => {
      const data = fs.readFileSync(outputCsv, 'utf8');
      const lines = data.split('\n');
      try {
        expect(lines[0]).toBe('name,age,city');
      } catch (error) {
        throw error;
      }
      try {
        expect(lines[1]).toBe('JOHN DOE,30,new york');
      } catch (error) {
        throw error;
      }
      try {
        expect(lines[2]).toBe('JANE SMITH,25,los angeles');
      } catch (error) {
        throw error;
      }
      done();
    };

    setTimeout(checkOutput, 1000); // Delay to ensure file is written
  }, 3000); // Increase Jest timeout to 3000ms

  test('should format CSV data correctly using streaming', (done) => {
    formatCsvStreaming(inputCsv, outputCsv);

    const checkOutput = () => {
      const data = fs.readFileSync(outputCsv, 'utf8');
      const lines = data.split('\n');
      try {
        expect(lines[0]).toBe('name,age,city');
      } catch (error) {
        throw error;
      }
      try {
        expect(lines[1]).toBe('JOHN DOE,30,new york');
      } catch (error) {
        throw error;
      }
      try {
        expect(lines[2]).toBe('JANE SMITH,25,los angeles');
      } catch (error) {
        throw error;
      }
      done();
    };

    setTimeout(checkOutput, 1000); // Delay to ensure file is written
  }, 3000); // Increase Jest timeout to 3000ms
});
