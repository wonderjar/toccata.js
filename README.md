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
```