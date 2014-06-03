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
	filterCanvas(grayscale)
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

 var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
   // apply a filter to the image data contained in the canvas object
  function filterCanvas(filter) {
    if (canvas.width > 0 && canvas.height > 0) {
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      filter(imageData);
      context.putImageData(imageData, 0, 0);
    }
  }
  // grayscale filter using an arithmetic average of the color 
  // components
  grayscale = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
    return pixels;
  };


// 60 FPS capture is 16.6ms
window.setInterval(videoToCanvas,50)