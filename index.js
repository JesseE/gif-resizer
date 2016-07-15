const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');


//resize gif with a certain width of 200px and it automaticly adds the proportional height
execFile(gifsicle, ['-o', 'temp/voorhoede_animatie-s.gif', 'src/voorhoede_animatie.gif','--resize-width', '200'], function (err) {
    console.log('Image minified!', err);
});

