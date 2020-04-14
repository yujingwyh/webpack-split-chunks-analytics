import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


export default {
  dist: path.resolve(__dirname, '../dist')
}
