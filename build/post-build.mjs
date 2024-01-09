import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs/promises';

const currentDirectory = path.dirname(url.fileURLToPath(import.meta.url));

const header = await fs.readFile(path.join(currentDirectory, 'header.txt'), 'utf-8');
const bundle = await fs.readFile(path.join(currentDirectory, '..', 'dist', 'index.js'), 'utf-8');
fs.writeFile(
    path.join(currentDirectory, '..', 'dist', 'index.js'),
    header + '\n' + bundle
);
