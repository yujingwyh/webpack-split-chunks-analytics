import build from '../scripts/main'

build({
  modulesStructure: [
    {
      name: 'one',
      asyncImport: [{
          name: 'A',
          syncImport: [{name: 'C',}, {name: 'D'}]
        },{
          name: 'B',
          syncImport: [{name: 'C'}]
        }
      ]
    }
  ],
  splitChunks:{
    minSize:1,
    cacheGroups:{
      "default":false,
      "common":{
        test:/C/
      }
    }
  }
});
