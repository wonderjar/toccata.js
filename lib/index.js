var toccata = {
  one(taskFunc, argsArr, options) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([
        `onmessage = function(e) { 
          var taskFunc = ${taskFunc.toString()};
          postMessage(taskFunc.apply(this, e.data)); 
        }`]);
      var blobURL = window.URL.createObjectURL(blob);
      var worker = new Worker(blobURL);
      worker.onmessage = function(e) {
        var result = e.data;
        resolve(result);
      };
      worker.postMessage(argsArr);
    });
  },

  all(tasks) {
    return Promise.all(tasks.map(([taskFunc, argsArr, options]) => this.one(taskFunc, argsArr, options)))
  }
}