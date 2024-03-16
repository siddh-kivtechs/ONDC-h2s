import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const logFilename = fileURLToPath(new URL('./logs.txt', import.meta.url));
const logStream = fs.createWriteStream(path.resolve(logFilename), { flags: 'a' });

export { logStream, logFilename };
