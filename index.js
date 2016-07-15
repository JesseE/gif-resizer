'use strict';
const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');
const glob = require('glob');
const path = require('path');

const files = glob.sync('./src/*.gif');

console.log(gifsicle);
//resize gif with a certain width of 200px and it automaticly adds the proportional height and optimization highest level
//execFile(gifsicle, ['-o', 'temp/voorhoede_animatie-s.gif', 'src/voorhoede_animatie.gif','--resize-width', '200', '-O3'], function (err) {
//    console.log('Image minified!', err);
//});


function makeGifPromise(file) {
    let input = `src/${file}`;
    let output = `temp/${file}`;
    return new Promise(function(resolve, reject){
        execFile(gifsicle, ['-o', output, input,'--resize-width', '200', '-O3'], (err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    })
}

Promise.all(files.map(makeGifPromise)).then(function(){console.log('hoppa')});
