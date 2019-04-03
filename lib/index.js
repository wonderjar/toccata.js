var toccata = {
  one({func, args, options}) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([
        `onmessage = function(e) { 
          var taskFunc = ${func.toString()};
          postMessage(taskFunc.apply(this, e.data)); 
        }`]);
      var blobURL = window.URL.createObjectURL(blob);
      var worker = new Worker(blobURL);
      worker.onmessage = function(e) {
        var result = e.data;
        resolve(result);
      };
      worker.postMessage(args);
    });
  },

  run(task) {
    return Array.isArray(task) ?
      Promise.all(task.map(({func, args, options}) => this.one({func, args, options}))) : this.one(task)
  }
}