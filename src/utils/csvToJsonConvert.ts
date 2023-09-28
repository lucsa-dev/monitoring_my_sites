import { Readable } from "stream";
import csv from 'csv-parser';

export default async function csvToJsonConvert(file: File): Promise<any[]> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const jsonArray: any[] = [];
    
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    await new Promise((resolve, reject) => {
        bufferStream
        .pipe(csv())
        .on('data', (row) => {
            jsonArray.push(row);
        })
        .on('end', () => {
            resolve(true);
        })
        .on('error', (error) => {
            reject(error);
        });
    });

    return jsonArray;
}