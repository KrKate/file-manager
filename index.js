import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as readline from 'node:readline';
import { existsSync } from 'fs';

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
rl.on('line', (input) => {
  input = input.trim();
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case '.exit':
        if(args.length > 0) {
          throw new Error('Invalid input');
        }
        rl.close();
        break;
      case 'cd':
        if(args.length === 0) { 
          throw new Error('Invalid input');
        }

        const newPath = join(__dirname, ...args);
        if (!existsSync(newPath)) {
          throw new Error('Operation failed');
        }
        __dirname = newPath;
        break;
      case 'up':
        if(args.length > 0) {
          throw new Error('Invalid input');
        }

        __dirname = dirname(__dirname);
        break;
    }
  } catch(err) {
    console.log(err.message);
  }

  console.log(`You are currently in ${__dirname}`);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});