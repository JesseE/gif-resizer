'use strict';
const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');
const createStream = require('gif-video');
const glob = require('glob');
const path = require('path');
const files = glob.sync('./src/*.gif', {root: './src/'});
const fs = require('fs');

function resizeGIF(file) {

    const sizes = [
        { suffix: '-s', width: 200 }//,
        // { suffix: '-m', width: 600 },
        // { suffix: '-l', width: 900 }
    ];

    return Promise.all(sizes.map(size => {
        return new Promise((resolve, reject) => {

            let fileBasename = path.basename(file);
            let fileExtension = path.extname(file);
            let fileBasenameNoExtension = fileBasename.slice(0,-1 * fileExtension.length);
            let newFileExtension = '.mp4';

            const input = `src/${fileBasename}`;
            const output = `temp/${fileBasenameNoExtension}${size.suffix}${newFileExtension}`;

            fs.createReadStream(input)
                .pipe(createStream({ width: 500 }))
                .pipe(fs.createWriteStream(output));
        }
      )
    }));
}

Promise.all(files.map(resizeGIF)).then(function(){console.log('gifs resized')});
