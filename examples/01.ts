import analytics from '../scripts/main'

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
