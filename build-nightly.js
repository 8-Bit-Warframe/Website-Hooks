var execSync = require('child_process').execSync;

console.log("Starting nightly build...");
console.log("Checking out master...");
execSync("git checkout master", {cwd: '/ls-src/desktop'});
console.log("Pulling from master...");
execSync("git pull origin master", {cwd: '/ls-src/desktop'});
console.log("Updating submodules...");
execSync("git submodule update", {cwd: '/ls-src/desktop'});
console.log("Building jar...");
execSync("gradle shadowJar -PversionText=NIGHTLY", {cwd: '/ls-src/desktop'});
console.log("Building exe...");
execSync("gradle createExe -PversionText=NIGHTLY", {cwd: '/ls-src/desktop'});
console.log("Nightly build complete");