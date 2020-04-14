import {initDist, generateFiles, generateEntry} from "./file.mjs";
import {build} from "./compile.mjs";

function validationShape(shape) {
  if (!Array.isArray(shape)) {
    throw new Error('shape 参数不合法');
  }
  shape.forEach(item => {
    if (!item.name || typeof item.name !== 'string') {
      throw new Error('shape 参数不合法')
    }
    if (item.size && typeof item.size !== "number") {
      throw new Error('shape 参数不合法')
    }
    if (item.syncImport) {
      validationShape(item.syncImport);
    }
    if (item.asyncImport) {
      validationShape(item.asyncImport);
    }
  });
}

export default async function main(shape) {
  validationShape(shape);
  await initDist();
  await generateFiles(shape);
  await generateEntry(shape);

  build();
}
