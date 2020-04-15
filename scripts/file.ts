import * as fs from 'fs'
import * as path from 'path'
import * as del from 'del'
import {config, ShapeDescribe,FileDescribe} from './utils'


async function writeFile(writePath:string, data:any) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.resolve(config.output, writePath), data, function (err,) {
      if (err) reject(err);

      resolve();
    })
  })
}

export async function initDist() {
  await del(config.output);

  return new Promise(async function (resolve, reject) {
    fs.mkdir(config.output, function (err) {
      if (err) reject(err);

      resolve();
    })
  })
}

export async function generateFiles(shape: ShapeDescribe) {
  const files = getFiles(shape);

  for (let file of Object.values(files)) {
    await writeFile(file.name + '.js', getContent(file))
  }


  function getFiles(options: ShapeDescribe, existFiles: { [index: string]: FileDescribe } = {}) {
    for (const option of options) {
      const existFile = existFiles[option.name] = existFiles[option.name] || {
        size: 0,
        name: option.name,
        asyncDepends: [],
        syncDepends: []
      };
      if (option.size) {
        existFile.size = option.size;
      }

      if (option.asyncImport) {
        option.asyncImport.forEach(item => {
          if (!existFile.asyncDepends.includes(item.name)) {
            existFile.asyncDepends.push(item.name);
          }
        });
        getFiles(option.asyncImport, existFiles);
      }
      if (option.syncImport) {
        option.syncImport.forEach(item => {
          if (!existFile.syncDepends.includes(item.name)) {
            existFile.syncDepends.push(item.name);
          }
        });
        getFiles(option.syncImport, existFiles);
      }
    }

    return existFiles;
  }

  function getContent(file: FileDescribe) {
    let content = '';

    file.syncDepends.forEach(item => {
      content += `import ${item} from './${item}';\r`
    });
    file.asyncDepends.forEach(item => {
      content += `const ${item} = import('./${item}');\r`
    });

    content += `export default {};\r`;

    if (file.size) {
      return addContentToSize(content, file.size);
    }
    return content;
  }

  function addContentToSize(content: string, size: number) {
    size = size * 1024 - content.length;


    return size > 0 ? content + ' '.repeat(size) : content;
  }
}

export async function generateEntry(shape: ShapeDescribe) {
  const entry = shape.reduce((prev, curr) => {
    prev[curr.name] = path.resolve(config.output, './' + curr.name + '.js');

    return prev;
  }, {} as { [index: string]: string });

  await writeFile(
    './entry.json',
    JSON.stringify(entry)
  );
}