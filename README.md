remote-test
============

``` js
var Test = require('remote-test');

var remoteTest = new Test('nodejs');

//direct access to duplexemitter if needed
//remoteTest.remote

remoteTest.on('ready', function () {
  var uptime = remoteTest.spawn('uptime', [], {});

  uptime.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  uptime.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  uptime.on('close', function (code) {
    console.log('command finished with code ' + code);
    //continue your command spree... ending with remoteTest.finish()
    //check test/lab.js
  });
});
```