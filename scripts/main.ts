import {generatePackFiles, initEntryDirectory} from "./file";
import {pack} from "./pack";
import {ModuleDescribe, OptionsDescribe} from "./utils";

//校验入口参数
function validateModulesScheme(modulesScheme: ModuleDescribe[]) {
  if (!Array.isArray(modulesScheme)) {
    throw new Error('entry 参数不合法');
  }
  modulesScheme.forEach(item => {
    if (!item.name || typeof item.name !== 'string') {
      throw new Error('entry 参数不合法')
    }
    if (item.size && typeof item.size !== "number") {
      throw new Error('entry 参数不合法')
    }
    if (item.syncImport) {
      validateModulesScheme(item.syncImport);
    }
    if (item.asyncImport) {
      validateModulesScheme(item.asyncImport);
    }
  });
}

//入口
export default async function build(options: OptionsDescribe) {
  validateModulesScheme(options.modulesStructure);
  await initEntryDirectory();
  await generatePackFiles(options.modulesStructure);

  pack(options);
}
