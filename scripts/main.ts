import {generateEntry, generateFiles, initEntry} from "./file";
import {build} from "./compile";
import {ShapeDescribe} from "./utils";

//校验参数
function validationShape(shape: ShapeDescribe) {
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

//入口
export default async function main(shape: ShapeDescribe) {
  validationShape(shape);
  await initEntry();
  await generateFiles(shape);
  await generateEntry(shape);

  build();
}
