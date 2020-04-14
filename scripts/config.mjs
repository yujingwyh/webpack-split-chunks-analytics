import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


export default {
  output: path.resolve(__dirname, '../source')
}
