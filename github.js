var express = require('express');
var git = require('simple-git')();
var exec = require('child_process').exec;

var app = express();

app.post('/github/release', function () {
	git.pull("origin", "master");
	git.submoduleUpdate();
	exec("gradle createExe", {cwd: '/ls-src/desktop'});
});

app.listen(1234);