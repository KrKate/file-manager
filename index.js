import { dirname, join } from 'path';
import * as readline from 'node:readline';
import { rename, unlink } from 'fs/promises';
import { fileURLToPath } from 'url';
import {ls} from './ls.js'
import {cat} from './cat.js'
import {add} from './add.js'
import {cp} from './cp.js'
import {mv} from './mv.js'
import { exists } from './helpers/exists.js';
import {rm} from './rm.js'

let __dirname = dirname(fileURLToPath(import.meta.url));
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

      case 'add':
          if (args.length !== 1) {
            throw new Error('Invalid input');
          }
          await add(args[0]);
      break;
      case 'rn':
          if (args.length !== 2) {
             throw new Error('Invalid input');
          }
        const oldFilePath = join(__dirname, args[0]);
        const newFileName = args[1];
        const newFilePath = join(dirname(oldFilePath), newFileName);
        await rename(oldFilePath, newFilePath);
      break;

      case 'cp':
        if (args.length !== 2) {
          throw new Error('Invalid input');
         }
        const sourcePath = join(__dirname, args[0]);
        const destinationPath = join(__dirname, args[1]);
        await cp(sourcePath, destinationPath);
      break;

      case 'mv':
        if (args.length !== 2) {
          throw new Error('Invalid input');
        }
        const sourceMVPath = join(__dirname, args[0]);
        const destinationMVPath = join(__dirname, args[1]);
        await mv(sourceMVPath, destinationMVPath);
      break;
      case 'rm':
        if (args.length !== 1) {
          throw new Error('Invalid input');
        }
        const path = join(__dirname, args[0]);
        await rm(path);
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