var video        = document.querySelector("#vid"),
canvas           = document.querySelector('#liveFeed'),
	w              = canvas.width,
	h              = canvas.height,
	ctx            = canvas.getContext('2d'),
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
   delay = function (pixels, args) {
   	window.setTimeout(function(){delayedctx.putImageData(pixels, 0, 0);},250)
   	var delayedData = delayedctx.getImageData(0, 0, canvas.width, canvas.height);

    var DNow = pixels.data;
    var DThen = delayedData.data;
    for (var i = 0; i < d.length; i += 4) {
      var r1 = DNow[i];
      var g1 = DNow[i + 1];
      var b1 = DNow[i + 2];
      var r2 = DThen[i];
      var g2 = DThen[i + 1];
      var b2 = DThen[i + 2];
      DNow[i] = DNow[i]-DThen[i]
      DNow[i+1] = DNow[i+1]-DThen[i+1]
      DNow[i+2] = DNow[i+2]-DThen[i+2]

    }
    return pixels;}
 

  blue = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      d[i] = 0;
      d[i + 1] = 0;
    }
    return pixels;
  };

  noFilter = function (pixels, args) {
    return pixels;
  };

  blackWhiteAndInTheMiddle = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
      if (d[i]<100){
      	 d[i] = d[i + 1] = d[i + 2] =0
      }
      if (d[i]>155){
      	 d[i] = d[i + 1] = d[i + 2] =255
      }
    }
    return pixels;
  };
blackWhiteAndColor = function (pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      // d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
      if ((r+g+b)/3<100){
      	 d[i] = d[i + 1] = d[i + 2] =0
      }
      if ((r+g+b)/3>155){
      	 d[i] = d[i + 1] = d[i + 2] =255
      }
    }
    return pixels;
  };

whiteLines = function (pixels, args) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;

    if (d[i]>A&& d[i]<B){
    	for (var j = i; j > i-50; j --) {
    	 d[j] = d[j + 1] = d[j + 2] =255
	    }
	  }
	}
  return pixels;
};

colorsMod = function (pixels, args) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
  	var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    if (r>modN || g>modN || b>modN)
    	d[i] = r%modN;
    	d[i + 1] =  g%modN;
      d[i + 2] = b%modN;
  }
  return pixels;
};

f = blackWhiteAndInTheMiddle
// 60 FPS capture is 16.6ms
window.setInterval(videoToCanvas,50)

A = 100
B = 110