const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');

execFile(gifsicle, ['-o', 'temp/voorhoede_animatie-s.gif', 'src/voorhoede_animatie.gif','--resize-width', '200'], function (err) {
    console.log('Image minified!', err);
});