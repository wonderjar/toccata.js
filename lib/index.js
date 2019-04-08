var toccata = {
  one({func, args, callback, importScripts, options}) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([
        `
          ${ importScripts ? `importScripts('${importScripts.join("','")}')` : '' }
          onmessage = function(e) { 
            var taskFunc = ${func.toString()};
            postMessage(taskFunc.apply(this, e.data)); 
          }
        `]);
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
      Promise.all(task.map((oneTask) => this.one(oneTask))) : this.one(task)
  }
}