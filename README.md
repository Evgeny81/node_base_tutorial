## Step 5. (Gulp - Task runner)

__In this part we are going to integrate__ __**Gulp**.__
 
 - `gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.`

###Let's start with the instalation first. 

To install Gulp just type.
> npm install gulp-cli -g

> npm install gulp -D

 - First we need to have gulp-cli to be installed globally
 - Second install gulp itself as a dev dependency by adding __-D__ when install
 
#### Now let's create a gulpfile
> touch gulpfile.js   

Add content
 

	
```javascript
const gulp = require('gulp'),
    spawn = require('child_process').spawn;
let node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
    if (node) node.kill();
    node = spawn('node', ['./bin/www'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('watch', function() {
    gulp.run('server');

    gulp.watch(['./**/*.js'], function() {
        gulp.run('server');
    })
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});
```

We have just defined two gulp tasks called __server__ and __watch__ respectively.

#####Server 
 Simple task that kills any previously launched node servers and run our __www__ server file located under ./bin/ directory
 
#####Watch
 Does two things. First, it starts a server by running *task* __server__. Finaly, it appends a watcher to root directory of the project to watch for all .js files under all directories located under root directories under root. __./\*\*/*.js__     

After running __gulp watch__ we will trigger both our server and register a watcher which will restart the server if any modification under each 

__To conclude__,
 We integrate Gulp to have a simple watcher to be able to restart the server automatically on any .js file change

__Next__,
We are goin to do some refactoring to escape the mass we have currently in our toutes. 