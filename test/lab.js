var Test = require('../test');

var remoteTest = new Test('nodejs');

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
  });
});
