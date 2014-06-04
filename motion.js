var video        = document.querySelector("#vid"),
canvas           = document.querySelector('#liveFeed'),
	w              = canvas.width,
	h              = canvas.height,
	ctx            = canvas.getContext('2d'),
topLayer         = document.getElementById('topLayer'),
	topLayerCtx    = canvas.getContext('2d'),
delayedCanvas    = document.querySelector('#delayed'),
	delayedctx     = delayedCanvas.getContext('2d');


function onCameraFail() {
	ctx.textAlign = "center";
	ctx.font      = "20px Georgia";
	ctx.fillText("Camera did not work.",w/2,h/2);
};

function videoToCanvas() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0);
	}
	modN = document.getElementById('modNumber').value
	filterCanvas(f)

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

 var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
   // apply a filter to the image data contained in the canvas object
  function filterCanvas(filter) {
    if (canvas.width > 0 && canvas.height > 0) {
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      filter(imageData);
      ctx.putImageData(imageData, 0, 0);
    }
  }


positionTest = function (pixels, args) {
  var d = pixels.data;
  // topLayer.width = topLayer.width;
  for (var i = 0; i < d.length; i += 4) {
     var r  = d[i];
     var g  = d[i + 1];
     var b  = d[i + 2];
     k      = i/(w*4)
     column = Math.ceil(k)
     row    = w*(k-Math.floor(k))
     d[i] = d[i+1] = d[i+2] = 0
     if ((r+g+b)/3>200 && (r+g+b)/3<210)
      topLayerCtx.fillStyle = "#FF0000";
      topLayerCtx.fillRect(row,column,20,20);
    }
  }

  return pixels;
};


f = blackWhiteAndInTheMiddle
// 60 FPS capture is 16.6ms
window.setInterval(videoToCanvas,50)

A = 100
B = 110

