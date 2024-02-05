import { createReadStream, createWriteStream, promises as fsPromises } from 'fs';

const mv = async (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);

  readStream.on('error', (err) => {
    console.log(err.message);
  });

  writeStream.on('error', (err) => {
    console.log(err.message);
  });

  readStream.pipe(writeStream);

  try {
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    await fsPromises.unlink(sourcePath);
  } catch (error) {
    console.log('Error deleting file:', error);
    throw error;
  }
};

export { mv };
