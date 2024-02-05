import { unlink } from 'fs/promises';

export const rm = async (filePath) => {
    await unlink(filePath);
  };