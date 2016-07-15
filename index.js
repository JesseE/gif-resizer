const gulp = require('gulp');
const debug = require('gulp-debug');
const execFile = require('child_process').execFile;
const concat = require('concat-frames');
const resize = require('resizer-stream');
const fs = require('fs');
const neuquant = require('neuquant');
const GIFEncoder = require('gif-stream/encoder');
const rename = require('gulp-rename');
const GIFDecoder = require('gif-stream/decoder');


fs.createReadStream('src/voorhoede_animatie.gif')
    .pipe(new GIFDecoder())
    .pipe(concat(function(frames) {
        for (var i = 0; i < frames.length; i++) {
            frames[i].width = 300;
            frames[i].height = 200;
            console.log(frames[i].width,frames[i].height);
        }
    }))
    .pipe(fs.createWriteStream('temp/voorhoede_animatie.gif'));