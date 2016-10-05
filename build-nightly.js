var git = require('simple-git')();
var execSync = require('child_process').execSync;

git.checkout("master");
git.pull("origin", "master");
execSync("gradle shadowJar -PversionText=NIGHTLY", {cwd: '/ls-src/desktop'});
execSync("gradle createExe -PversionText=NIGHTLY", {cwd: '/ls-src/desktop'});