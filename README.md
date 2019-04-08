# toccata.js
Easy multi-thread task processing for brower-side Javascript based on Web Worker

APIs

Method | Arguments | Description
------------ | ------------ | -------------
run | Option or Array(Option) | Run a single or an array of tasks


Supported Option props

Prop | Type | Required | Description
------------ | ------------ | ------------- | -------------
func | Function | True | The task function 
args | Array | False | Arguments for the task function
callback | Function | False | Callback of manually call postMessage in func
importScripts | Array | False | Array of path of external scripts

Example
```javascript
var addFunc = function(a, b) { return a + b; };

toccata.run({
  func: addFunc,
  args: [1,2]
}).then(result => {
  //...
})
  
toccata.run([
    { func: addFunc, args: [3, 4] },
    { func: addFunc, args: [5, 6] }
  ]).then(result => {
    //...
  })

// Do continuous job
toccata.run({
  func: () => { setInterval(() => postMessage('Hello'), 4000) },
  callback: (result) => alert(result)
})

// Import external scripts
toccata.run({
  func: () => _.max([1,2,3],
  importScripts: ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js']
})
```

Roadmap

- Exception handler