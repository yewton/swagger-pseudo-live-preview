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
    whitelist: ['/', '/app/views/main.html', '/scripts/scripts.js'],
    rules: [
      {
        match: /[a-zA-Z]\.put/,
        fn: function(match) {
          return 'true||' + match;
        }
      },
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
        match: /<div class="total-wrapper" ui-view>/,
        fn: function () {
          return multi(function () {/*
<style>
  section.status-bar {
    display: none;
  }
</style>
<div class="total-wrapper" ui-view>
<script type="text/javascript" language="javascript">
  var previousYamlBody = '';
  setInterval(function () {
    var b = angular.element(document.body).injector().get("Backend");
    b.load("yaml").then(function(data) {
      if (previousYamlBody != data) {
        previousYamlBody = data;
        b.save("yaml", data);
      }
    })}, 1000);
</script>
*/});
        }
      }
    ]
  };
  foxy(originUri, config).listen(listenPort);
  gutil.log('Proxying: ' + gutil.colors.cyan(originUri));
  gutil.log('Access URL: ' + gutil.colors.cyan(accessUri));

  waitOn({
    resources: [originUri], delay: 0, interval: 500, timeout: 30000
  }, function (err) {
    console.log(gutil.colors.cyan('Ready.'));
  });
});
