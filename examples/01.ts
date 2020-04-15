import parse from '../scripts/main'

parse([
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
  }
])
