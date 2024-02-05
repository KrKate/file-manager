import { dirname, join } from 'path';
import * as readline from 'node:readline';
import { readdir, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import {ls} from './ls.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${__dirname}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});


// const ls = async () => {
//   try {
//     const files = await readdir(__dirname, { withFileTypes: true });
//     const fileStats = [];

//     const folders = files.filter(file => file.isDirectory());
//     const regularFiles = files.filter(file => file.isFile());

//     folders.sort((a, b) => a.name.localeCompare(b.name));
//     regularFiles.sort((a, b) => a.name.localeCompare(b.name));

//     const sortedFiles = folders.concat(regularFiles);
//     for (const file of sortedFiles) {
//       const filePath = join(__dirname, file.name);
//       const stats = await stat(filePath);
//       const type = stats.isDirectory() ? 'Folder' : 'File';
//       fileStats.push({ Name: file.name, Type: type });
//     }

//     console.table(fileStats);
//   } catch (error) {
//     console.error(error);
//   }
// };

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

rl.prompt();
rl.on('line', async (input) => {
  input = input.trim();
  const [command, ...args] = input.split(' ');
  try {
    switch (command) {
      case '.exit':
        if (args.length > 0) {
          throw new Error('Invalid input');
        }
        rl.close();
        break;
      case 'cd':
        if (args.length === 0) {
          throw new Error('Invalid input');
        }
        const newPath = join(__dirname, ...args);
        if (!(await exists(newPath))) {
          throw new Error('Operation failed');
        }
        __dirname = newPath;
        break;
      case 'up':
        if (args.length > 0) {
          throw new Error('Invalid input');
        }
        __dirname = dirname(__dirname);
        break;
      case 'ls':
        if (args.length > 0) {
          throw new Error('Invalid input');
        }
        await ls();
        break;
      case 'cat':
        if (args.length !== 1) {
          throw new Error('Invalid input');
        }
        const filePath = join(__dirname, args[0]);
        await cat(filePath);
        break;
    }
  } catch (err) {
    console.log(err.message);
  }
  console.log(`\nYou are currently in ${__dirname}`);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});