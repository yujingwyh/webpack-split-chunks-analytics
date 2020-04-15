import * as fs from 'fs'
import * as path from 'path'
import * as del from 'del'
import {config, FileDescribe, ShapeDescribe} from './utils'

//写文件
async function writeFile(writePath: string, data: any) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.resolve(config.entry, writePath), data, function (err,) {
      if (err) reject(err);

      resolve();
    })
  })
}

//初始entry目录
export async function initEntry() {
  await del(config.entry);

  return new Promise(async function (resolve, reject) {
    fs.mkdir(config.entry, function (err) {
      if (err) reject(err);

      resolve();
    })
  })
}

//生成源码文件
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
      content += `import sync${getVariableName(item)} from './${item}';\r`
    });
    file.asyncDepends.forEach(item => {
      content += `const async${getVariableName(item)} = import('./${item}');\r`
    });

    content += `export default '${file.name}';\r`;

    if (file.size) {
      return addContentToSize(content, file.size);
    }
    return content;
  }

  function addContentToSize(content: string, size: number) {
    size = size * 1024 - content.length;


    return size > 0 ? content + ' '.repeat(size) : content;
  }

  function getVariableName(name:string) {
    return name.replace(name.charAt(0), name.charAt(0).toUpperCase());
  }
}

//生成入口文件
export async function generateEntry(shape: ShapeDescribe) {
  const entry = shape.reduce((prev, curr) => {
    prev[curr.name] = path.resolve(config.entry, './' + curr.name + '.js');

    return prev;
  }, {} as { [index: string]: string });

  await writeFile(
    './entry.json',
    JSON.stringify(entry)
  );
}
