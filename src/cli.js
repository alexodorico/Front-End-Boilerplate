const fs = require("fs");
const ncp = require("ncp");
const path = require("path");
import { promisify } from 'util';
import { exec } from 'child_process';

const copy = promisify(ncp);

export async function cli(args) {
  if (args[2] && !fs.existsSync(args[2])) {
    fs.mkdirSync(args[2]); 

    const currentUrl = import.meta.url;
    const templateDir = path.resolve(
      new URL(currentUrl).pathname,
      '../../template'
    );

    await copy(templateDir, args[2]);
    console.log("Files copied");
    let install = exec(`cd ${args[2]} ; npm install`);
    console.log('Installing npm packages...');
    install.on('exit', _ => console.log(`${args[2]} created!`));
  } else {
    console.log('Please give a valid directory name for your project!');
  }
}