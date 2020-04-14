import parse from '../scripts/main.mjs'

parse([
  {
    name:'a',
    size:10,
    syncImport:[
      {name:'b'}
    ]
  }
])
