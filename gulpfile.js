var execSync = require('child_process').execSync;
var foxy = require('foxy');
var gulp = require('gulp');
var gutil = require('gulp-util');
var multi = require('multiline');
var waitOn = require('wait-on');

var editorPort = 8080;
var listenPort = 3000;

gulp.task('serve', function() {
  var originUri = 'http://localhost:' + editorPort;
  var accessUri = 'http://localhost:' + listenPort;
  var config = {
    whitelist: ['/', '/app/views/main.html'],
    rules: [
      {
        match: /<div ui-layout="{ flow : 'column', dividerSize: '8px'}">/,
        fn: function() {
          return '<div ui-layout="{ flow : \'row\', disableToggle: true}">';
        }
      },
      {
        match: /<div class="editor pane" ui-layout-container>/,
        fn: function() {
          return '<div style="display: none;">';
        }
      },
      {
        match: /<body><div/,
        fn: function () {
          return multi(function () {/*
<style>
  section.status-bar {
    display: none;
  }
</style>
<body>
<script type="text/javascript" language="javascript">
  setInterval(function () {
    b = angular.element(document.body).injector().get("Backend");
    b.load("yaml").then(function(data) {
      b.save("yaml", data);
    })}, 1000);
</script><div
*/});
        }
      }
    ]
  };
  foxy(originUri, config).listen(listenPort);
  gutil.log('Proxying: ' + gutil.colors.cyan(originUri));
  gutil.log('Access URL: ' + gutil.colors.cyan(accessUri));

  waitOn({
    resources: [originUri], delay: 0, interval: 2000, timeout: 30000
  }, function (err) {
    console.log(gutil.colors.cyan('Ready.'));
  });
});
