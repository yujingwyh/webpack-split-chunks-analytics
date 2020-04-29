import analytics from '../scripts/main'

analytics({
  modulesStructure: [
    {
      name: 'app-a',
      syncImport: [{name: 'lib-o'},],
      asyncImport: [{
          name: 'page-h',
          syncImport: [{name: 'lib-p',}, {name: 'lib-q-hi'}]
        },{
          name: 'page-i',
          syncImport: [{name: 'lib-p'}, {name: 'lib-q-hi'}]
        },{
          name: 'page-j',
          syncImport: [{name: 'lib-p'}]
        }
      ]
    },{
      name: 'app-b',
      syncImport: [{name: 'lib-p'},]
    }
  ],
  splitChunks:{
    chunks: "all",
    maxSize:400,
    cacheGroups:{
      default:false,
      hi:{
        test:/hi/,
        name:'test'
      }

    }
  }
});
