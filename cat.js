import { createReadStream } from 'fs';

function cat(filePath) {
    return new Promise((resolve, reject) => {
      const readable = createReadStream(filePath);
  
      readable.on('data', (chunk) => {
        process.stdout.write(chunk.toString());
      });
  
      readable.on('error', (error) => {
        reject(error);
      });
  
      readable.on('end', () => {
        resolve();
      });
    });
  }

export {cat};  