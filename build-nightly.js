var git = require('simple-git')();
var exec = require('child_process').exec;

git.checkout("master");
git.pull("origin", "master");
git.submoduleUpdate();
exec("gradle shadowJar", {cwd: '/ls-src/desktop'});
exec("gradle createExe", {cwd: '/ls-src/desktop'});