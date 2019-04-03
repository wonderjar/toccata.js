// console.log(window);
//
// phantom.exit();

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, 'test.html')}`);
  // await page.goto('about:blank');

  // eject toccata js
  await page.evaluate(() => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "../lib/index.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  })



  // test toccata.one
  await page.evaluate(() => {
    var addFunc = function(a, b) { return a + b; };
    toccata.one({
      func: addFunc,
      args: [1, 2]
    })
      .then(result => {
        alert(result)
      })
  })

  //test toccata.all
  await page.evaluate(() => {
    var addFunc = function(a, b) { return a + b; };
    toccata.run([
      {
        func: addFunc,
        args: [3, 4]
      },
      {
        func: addFunc,
        args: [5, 6]
      },
    ])
      .then(result => {
        alert(result)
      })
  })

  // await browser.close();
})();