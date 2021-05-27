const fs = require('fs')

function fiib(x){
  if(x <= 0)
    return 0;
  if(x <= 2)
    return 1;
  return fiib(x - 1) + fiib(x - 2)
}

console.time('js执行时间')
fiib(45)
console.timeEnd('js执行时间')


const bytes = fs.readFileSync('../test.wasm')
WebAssembly.compile(bytes).then((mod)=>{
  const instance = new WebAssembly.Instance(mod)
  const exp = instance.exports
  console.time('wasm执行时间')
  exp._Z4fiibi(45)
  console.timeEnd('wasm执行时间')
})
