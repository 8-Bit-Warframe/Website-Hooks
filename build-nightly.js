var git = require('simple-git')();
var execSync = require('child_process').execSync;

git.checkout("master");
git.pull("origin", "master");
execSync("gradle shadowJar", {cwd: '/ls-src/desktop'});
execSync("gradle createExe", {cwd: '/ls-src/desktop'});