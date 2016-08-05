'use strict';
const execFile = require('child_process').execFile;
const gifsicle = require('gifsicle');
const createStream = require('gif-video');
const glob = require('glob');
const path = require('path');
const files = glob.sync('./src/*.gif', {root: './src/'});
const fs = require('fs');

function resizeGIF(file) {
    //sizes you want each file to be and
    //the suffix which will be placed behind the the file name and before the file extension
    const sizes = [
        { suffix: '-s', width: 200 },
        { suffix: '-m', width: 500 },
        { suffix: '-l', width: 900 }
    ];

    return Promise.all(sizes.map(size => {
        return new Promise((resolve, reject) => {

            let fileBasename = path.basename(file);
            let fileExtension = path.extname(file);
            let fileBasenameNoExtension = fileBasename.slice(0,-1 * fileExtension.length);
            let newFileExtension = '.mp4';

            const input = `src/${fileBasename}`;
            const output = `temp/${fileBasenameNoExtension}${size.suffix}${newFileExtension}`;
            //the stream that creates the file with its
            fs.createReadStream(input)
                .pipe(createStream({ width: size.width }))
                .pipe(fs.createWriteStream(output));
        }
      )
    }));
}
//initialize promise
Promise.all(files.map(resizeGIF)).then(function(){console.log('gifs resized')});
