'use strict';
const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');
const glob = require('glob');
const files = glob.sync('./src/*.gif');
const fs = require('fs');

//resize gif with a certain width of 200px and it automatically adds the proportional height and optimization highest level
function makeGifPromise(file) {
    file = file.split("./src/").pop();
    let size = {
        's': {
            'tag' : '-s',
            'width': 200
        },
        'm': {
            'tag' : '-m',
            'width': 600
        },
        'l': {
            'tag' : '-l',
            'width': 900
        }
    };

    //need to find something smarter than this solution
    let fileBasename = file.slice(0, -4);
    let extension = '.gif';

    //fileBasename = fileBasename += size.s.tag += extension;
    let input = `src/${file}`;

    //this should be refactored or solved smarter
    let output_s = `temp/${fileBasename += size.s.tag += extension}`;
    let output_m = output_s.replace('-s', '-m');
    let output_l = output_m.replace('-m', '-l');

    //dont repeat you self stuff
    return new Promise(function(resolve, reject){
        execFile(gifsicle, ['-o', output_s, input,'--resize-width', size.s.width, '-O3'], (err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
        execFile(gifsicle, ['-o', output_m, input,'--resize-width', size.m.width, '-O3'], (err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
        execFile(gifsicle, ['-o', output_l, input,'--resize-width', size.l.width, '-O3'], (err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    })
}

Promise.all(files.map(makeGifPromise)).then(function(){console.log('gifs resized')});
