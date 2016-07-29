'use strict';
const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');
const glob = require('glob');
const path = require('path');
const files = glob.sync('./src/*.gif', {root: './src/'});
const fs = require('fs');

function resizeGIF(file) {

    const sizes = [
        { suffix: '-s', width: 200 },
        { suffix: '-m', width: 600 },
        { suffix: '-l', width: 1440 }
    ];

    return Promise.all(sizes.map(size => {

        return new Promise((resolve, reject) => {

            let fileBasename = path.basename(file);
            let fileExtension = path.extname(file);
            let fileBasenameNoExtension = fileBasename.slice(0,-1 * fileExtension.length);

            const input = `src/${fileBasename}`;
            const output = `temp/${fileBasenameNoExtension}${size.suffix}${fileExtension}`;

            //gifsicle used for resizing the input. -o is the oporation send output to file  and -03 is the maximum gif optimization level
            execFile(gifsicle, ['-o', output, input,'--resize-width', size.width, '-O3'], err => {
                err ? reject(err) : resolve(output);
            });
        }
      )
    }));
}

Promise.all(files.map(resizeGIF)).then(function(){console.log('gifs resized')});
