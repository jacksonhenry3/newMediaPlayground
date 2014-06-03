var video        = document.querySelector("#vid"),
canvas           = document.querySelector('#liveFeed'),
	w              = canvas.width,
	h              = canvas.height,
	ctx            = canvas.getContext('2d');

function onCameraFail() {
	ctx.textAlign = "center";
	ctx.font      = "20px Georgia";
	ctx.fillText("Camera did not work.",w/2,h/2);
};

function videoToCanvas() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0);
	}
	grayscale()
}

n = navigator
n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
n.getUserMedia(
	{video:true}, 
	function(stream) {
		// stream user media
		video.src = window.URL.createObjectURL(stream);
		localMediaStream = stream;
	},
	onCameraFail
);

// base_image = new Image();
// base_image.src = 'carrot.jpg';
// base_image.onload = function(){
// ctx.drawImage(base_image, 0, 0);

function grayscale() {
imageData = ctx.getImageData(0,0,w,h);


  var d = imageData.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;


var grayData = grayscale(imageData);
ctx.putImageData(grayData, 0, 0);
};
// Filters.filterImage(Filters.grayscale,base_image)

// 60 FPS capture is 16.6ms
window.setInterval(videoToCanvas,50)