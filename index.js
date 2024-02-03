import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readline } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${__dirname}`);


import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (input) => {
  input = input.trim();
  if (input === '.exit') {
    rl.close();
  } else {
    console.log(`Unknown command: "${input}"`);
    rl.prompt();
  }
});

rl.on('close', () => {
  process.exit();
});

rl.on('close', () => {
  process.exit();
});


process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
