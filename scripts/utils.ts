import * as path from 'path'

//配置
export const config = {
  //源码输出路径
  entry: path.resolve(__dirname, '../entry')
}

//模块描述
export interface ModuleDescribe {
  name: string,
  size?: number,
  syncImport?: ModuleDescribe[]
  asyncImport?: ModuleDescribe[]
}

//
export type ShapeDescribe = ModuleDescribe[];

//文件描述
export interface FileDescribe {
  size: number,
  name: string,
  asyncDepends: string[],
  syncDepends: string[]
}
