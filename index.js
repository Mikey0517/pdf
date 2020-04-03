var fs = require('fs');
var path = require( 'path' );
var pdf2png = require('pdf2png');
var Jimp = require('jimp');
var ocr = require('./ocr');
const dirPath = './pdf';

var dir = fs.readdirSync( dirPath );
for ( var i = 0; i < dir.length; i++ ) {
  var file = path.join( dirPath, dir[ i ] );
  pdf2png.convert( file, { quality: 200 }, function(resp){
    if( !resp.success ){
        console.log("Something went wrong: " + resp.error);
        return;
    }
    console.log("转格式完毕-" + file );
    Jimp.read( resp.data, (err, lenna) => {
      if (err) throw err;
      lenna
        .crop( 0, 0, lenna.bitmap.width, 200 )
        .greyscale() // set greyscale
        .getBufferAsync( lenna.getMIME() )
        .then( function ( imageBuffer ) {
          ocr( imageBuffer.toString( 'base64' ), function ( result ) {
            fs.copyFileSync( file, path.join( './dist', result.words_result[ 0 ].words.split( ':' )[ 1 ] + '.pdf' ) );
          } );
        } )
    });
  });
}