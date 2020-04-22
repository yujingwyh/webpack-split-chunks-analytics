import * as fs from 'fs'
import * as del from 'del'
import {config, FileDescribe, ModuleDescribe, writeFile} from './utils'


//初始entry目录
export async function initEntryDirectory() {
  await del(config.entry);

  return new Promise(async function (resolve, reject) {
    fs.mkdir(config.entry, function (err) {
      if (err) reject(err);

      resolve();
    })
  })
}

//生成打包文件
export async function generatePackFiles(modulesScheme: ModuleDescribe[]) {
  const files = getFiles(modulesScheme);

  for (let file of Object.values(files)) {
    await writeFile(file.name + '.js', getContent(file))
  }


  function getFiles(options: ModuleDescribe[], existFiles: { [index: string]: FileDescribe } = {}) {
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
      content += `import ${getVariableName('sync-' + item)} from './${item}';\r`
    });
    file.asyncDepends.forEach(item => {
      content += `const ${getVariableName('async-' + item)} = import(/* webpackChunkName: "${item}" */ './${item}');\r`
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

  function getVariableName(name: string) {
    return name
      .replace(/-[\w$]/g, word => word.charAt(1).toUpperCase())
      .replace(/[^\w$]/g, '');
  }
}
