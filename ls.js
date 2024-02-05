import { readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';


const ls = async () => {
    try {
      const currentDir = dirname(fileURLToPath(import.meta.url));
      const files = await readdir(currentDir, { withFileTypes: true });
      const fileStats = [];

      const folders = files.filter(file => file.isDirectory());
      const regularFiles = files.filter(file => file.isFile());

      folders.sort((a, b) => a.name.localeCompare(b.name));
      regularFiles.sort((a, b) => a.name.localeCompare(b.name));

      const sortedFiles = folders.concat(regularFiles);
      for (const file of sortedFiles) {
        const filePath = join(currentDir, file.name);
        const stats = await stat(filePath);
        const type = stats.isDirectory() ? 'Folder' : 'File';
        fileStats.push({ Name: file.name, Type: type });
      }

      console.table(fileStats);
    } catch (error) {
      console.error(error);
    }
  };

export {ls};