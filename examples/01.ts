import analytics from '../scripts/main'

analytics({
  modulesScheme: [
    {
      name: 'app-a',
      syncImport: [
        {name: 'lib-p'},
      ],
      asyncImport: [
        {
          name: 'page-h',
          syncImport: [{
            name: 'lib-p',
          }, {
            name: 'lib-o-hi'
          }]
        },
        {
          name: 'page-i',
          syncImport: [{
            name: 'lib-p'
          }, {
            name: 'lib-o-hi'
          }]
        },
        {
          name: 'page-j', syncImport: [{
            name: 'lib-p'
          }, {
            name: 'lib-q-big'
          }]
        }
      ]
    },
    {
      name: 'app-b'
    }
  ]
});
