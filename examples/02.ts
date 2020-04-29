import build from '../scripts/main'

build({
  modulesStructure: [
    {
      name: 'one',
      syncImport: [{name: 'A'},{name:"D"}],
      asyncImport: [{
          name: 'B',
          syncImport: [{name: 'D',}, {name: 'F'}]
        },{
          name: 'C',
          syncImport: [{name: 'F'}]
        }
      ]
    },{
      name: 'two',
      syncImport: [{name: 'A'},]
    }
  ],
  splitChunks:{
    cacheGroups:{
      "default":false
    }
  }
});
