import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const add = async (fileName = 'new_file.txt') => {
   const __dirname = dirname(fileURLToPath(import.meta.url));
    try {
      const filePath = join(__dirname, fileName);
      await writeFile(filePath, '');
    } catch (error) {
      console.error(error);
    }
  };

export {add};