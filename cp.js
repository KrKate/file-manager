import { createReadStream, createWriteStream } from 'fs';

const cp = (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);

  readStream.on('error', (err) => {
    console.log(err.message);
  });

  writeStream.on('error', (err) => {
    console.log(err.message);
  });

  readStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

export { cp };
