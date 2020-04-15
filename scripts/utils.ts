import * as path from 'path'


export const config = {
  output: path.resolve(__dirname, '../source')
}

export interface ModuleDescribe {
  name: string,
  size?: number,
  syncImport?: ModuleDescribe[]
  asyncImport?: ModuleDescribe[]
}

export type ShapeDescribe = ModuleDescribe[];


export interface FileDescribe {
  size: number,
  name: string,
  asyncDepends: string[],
  syncDepends: string[]
}
