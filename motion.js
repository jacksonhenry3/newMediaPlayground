var video     = document.querySelector("#vid"),
	canvas    = document.querySelector('#liveFeed'),
	w         = canvas.width,
	h         = canvas.height,
	ctx       = canvas.getContext('2d');

function videoToCanvas()
{
	if (localMediaStream)
	{
		ctx.drawImage(video, 0, 0);
	}
	filterCanvas(filter)
};

// Steam webcam video to video element
function webcamToVideo()
{
	n 			   = navigator
	n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
	window.URL 	   = window.URL || window.webkitURL;
	n.getUserMedia(
		{video:true}, 
		function(stream)
		{
			video.src = window.URL.createObjectURL(stream);
			localMediaStream = stream;
		},
		onCameraFail
	);
};

function onCameraFail()
{
	ctx.textAlign = "center";
	ctx.font      = "20px Georgia";
	ctx.fillText("Camera did not work.",w/2,h/2);
};

// apply a filter to the image data contained in the canvas object
function filterCanvas(filter)
{
	if (canvas.width > 0 && canvas.height > 0)
	{
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		filter(imageData);
		ctx.putImageData(imageData, 0, 0);
		for (var i = 0; i < window.places.length; i++) {
			row = window.places[i][0]
			column = window.places[i][1]
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(row,column,20,20);
		};
	}
};

positionTest = function (pixels)
{
	var d = pixels.data;
	window.places = []
	j=0
	for (var i = 0; i < d.length; i += 4)
	{
		var r  = d[i];
		var g  = d[i + 1];
		var b  = d[i + 2];
		k      = i/(w*4)
		column = Math.ceil(k)
		row    = w*(k-Math.floor(k))
		d[i]   = d[i+1] = d[i+2] = 0
		if ((r+g+b)/3>200)
		{
			window.places[j] = [row,column]
			j++
			// ctx.fillStyle = "#FF0000";
			// ctx.fillRect(row,column,20,20);
		}
	}
	return pixels;
};
webcamToVideo()
window.setInterval(videoToCanvas,50)
filter = positionTest