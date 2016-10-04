var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({path: '/github/release', secret: '84aG0M9XcJdc1bryIDPz'});
var GitHubApi = require('github');
var git = require('simple-git');
var exec = require('child_process').exec;

var github = new GitHubApi({
	Promise: require('bluebird')
});

http.createServer(function (req, res) {
	handler(req, res, function () {
		res.statusCode = 404;
		res.end('No such location')
	})
}).listen(1234);

handler.on('error', function (err) {
	console.error('Error: ', err.message)
});

handler.on('release', function (event) {
	github.gitdata.getReference({
		user: '8-Bit-Warframe',
		repo: 'Lost-Sector-desktop',
		ref: 'tags/' + event.payload.release.tag_name
	}, function (err, res) {
		git.checkout("master");
		git.pull("origin", "master");
		git.checkout(res.object.sha);
		git.submoduleUpdate();
		exec("gradle shadowJar", {cwd: '/ls-src/desktop'});
		exec("gradle createExe", {cwd: '/ls-src/desktop'});
	});
});
