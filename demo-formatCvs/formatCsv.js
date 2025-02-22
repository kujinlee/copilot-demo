import csv from 'csv-parser';
import fs from 'fs';
import { writeToStream, format as fastcsvFormat } from 'fast-csv';

const formatCsv = (inputFile, outputFile) => {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const results = [];
    readStream
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('error', (error) => {
            console.error(`Error reading CSV file: ${error.message}`);
        })
        .on('end', () => {
            const formattedResults = results.map((result) => ({
                name: result.name.toUpperCase(),
                age: parseInt(result.age, 10),
                city: result.city.toLowerCase(),
            }));

            writeToStream(writeStream, formattedResults, { headers: true })
                .on('error', (error) => {
                    console.error(`Error writing CSV file: ${error.message}`);
                })
                .on('finish', () => {
                    console.log(`formatCsv: [${new Date().toISOString()}] CSV file successfully processed`);
                });
        });

    readStream.on('error', (error) => {
        console.error(`Error opening input file: ${error.message}`);
    });

    writeStream.on('error', (error) => {
        console.error(`Error opening output file: ${error.message}`);
    });
};

const formatCsvStreaming = (inputFile, outputFile) => {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const csvStream = fastcsvFormat({ headers: true });
    csvStream.pipe(writeStream).on('finish', () => {
        console.log(`formatCsvStreaming: [${new Date().toISOString()}] CSV file successfully processed`);
    });

    readStream
        .pipe(csv())
        .on('data', (data) => {
            const formattedData = {
                name: data.name.toUpperCase(),
                age: parseInt(data.age, 10), // The second argument 10 specifies the radix (base-10)
                city: data.city.toLowerCase(),
            };
            csvStream.write(formattedData);
        })
        .on('end', () => {
            csvStream.end();
        });
};

export { formatCsv, formatCsvStreaming };

formatCsv('input.csv', 'output.csv');