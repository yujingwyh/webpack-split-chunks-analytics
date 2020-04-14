import fs from 'fs'
import path from 'path'
import del from 'del'
import config from './config.mjs'

async function writeFile(writePath, data) {
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

export async function generateFiles(shape) {
  const files = getFiles(shape);

  for (let file of Object.values(files)) {
    await writeFile(file.name + '.js', getContent(file))
  }


  function getFiles(options, existFiles = {}) {
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

  function getContent(file) {
    let content = '';

    file.syncDepends.forEach(item => {
      content += `import ${item} from './${item}';\r`
    });
    file.asyncDepends.forEach(item => {
      content += `const ${item} = import('./${item}');\r`
    });

    content += `export default {};`;

    if (file.size) {
      return addContentToSize(content, file.size);
    }
    return content;
  }

  function addContentToSize(content, size) {
    size = size * 1024 - content.length;


    return size > 0 ? content + ' '.repeat(size) : content;
  }
}

export async function generateEntry(shape) {
  const entry = shape.reduce((prev, curr) => {
    prev[curr.name] = path.resolve(config.output, './' + curr.name + '.js');

    return prev;
  }, {});

  await writeFile(
    './entry.json',
    JSON.stringify(entry)
  );
}
