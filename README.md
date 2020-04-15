# webpack-split-chunks-analytics

[webpack分块分析](https://zhuanlan.zhihu.com/p/113751146)

## 安装

安装依赖 <br />
`npm install`

运行示例 <br />
`ts-node examples/01.ts`

## 示例

比如两个入口文件a和e文件，其中a文件中引入了b和c文件，并且动态引入了b和d文件

```ts
import analytics from './scripts/main'

analytics([
  {
    name:'a',
    syncImport:[
      {name:'b'},
      {name:'c'}
    ],
    asyncImport:[
      {name:'b'},
      {name:'d'}
    ]
  },
  {
    name:'e'
  }
]);
```

运行后在浏览器中的截图为
