var Test = require('../test');

var max = 100;
var counter = max * 2;

for (var i = max; i > 0; i--) {
  sendTest(i);
}


function sendTest(i) {
  var remoteTest = new Test('nodejs');

  remoteTest.on('ready', function () {
    var uptime = remoteTest.spawn('/usr/bin/touch', ['blabla' + i], {});

    uptime.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    uptime.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    uptime.on('close', function (code) {
      finished(code);
      sendUname(remoteTest, i);
    });
  });
}


function sendUname(remoteTest, i) {
  var uname = remoteTest.spawn('cat', ['blabla' + i], {});

  uname.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  uname.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  uname.on('close', function(code) {
    finished(code);
    remoteTest.finish();
  });
}

function finished(code) {
  counter--;
  console.log(counter + ' command finished with code ' + code);
  if(counter === 0) {
    process.exit(0);
  }
}