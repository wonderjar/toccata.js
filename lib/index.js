var toccata = {
  one({func, args, callback, options}) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([
        `onmessage = function(e) { 
          var taskFunc = ${func.toString()};
          postMessage(taskFunc.apply(this, e.data)); 
        }`]);
      var worker = new Worker(window.URL.createObjectURL(blob));
      worker.onmessage = function(e) {
        var result = e.data;
        callback ? callback(result) : resolve(result);
      };
      worker.postMessage(args);
    });
  },

  run(task) {
    return Array.isArray(task) ?
      Promise.all(task.map(({func, args, callback, options}) => this.one({func, args, callback, options}))) : this.one(task)
  }
}