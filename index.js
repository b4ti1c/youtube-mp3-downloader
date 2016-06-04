'use strict';


const childProcess = require('child_process');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');

if (!process.argv[2]) throw 'You must supply a videolink';
if (!process.argv[3]) throw 'You must supply a filename';

const link = process.argv[2].replace(/^.*?v=/, '');
const name = process.argv[3] + '.mp3';

childProcess.exec('which ffmpeg', function (error, stdout, stderr) {
    if (error) throw 'Error retrieving ffmpeg path';

    let ffmpegPath = stdout;
    const YD = new YoutubeMp3Downloader({
       "ffmpegPath": ffmpegPath,        // Where is the FFmpeg binary located? 
       "outputPath": "~/Downloads/",    // Where should the downloaded and encoded files be stored? 
       "youtubeVideoQuality": "highest",       // What video quality should be used? 
       "queueParallelism": 2,                  // How many parallel downloads/encodes should be started? 
       "progressTimeout": 2000                 // How long should be the interval of the progress reports 
    });

    YD.on("finished", function(data) {
       console.log(data);
    });

    YD.on("error", function(error) {
       console.log(error);
    });

    YD.on("progress", function(progress) {
       console.log(progress);
    });

    YD.download(link, name);
});



