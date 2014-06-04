var video     = document.querySelector("#vid"),
	canvas    = document.querySelector('#liveFeed'),
	w         = canvas.width,
	h         = canvas.height,
	ctx       = canvas.getContext('2d'),
	power     = 5;
	window.place = [0,0]
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
ctx.beginPath();
			ctx.moveTo(0, 0);
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
			row = window.place[0]
			column = window.place[1]
			// r = window.places[i][2][0]
			// g = window.places[i][2][1]
			// b = window.places[i][2][2]
			// ctx.fillStyle = "rgb("+r+","+g+","+b+")";
			// ctx.fillRect(row,column,2,2);

			// ctx.beginPath();
			// ctx.arc(row, column, 50, 0, 2 * Math.PI, false);
			// ctx.fillStyle = 'green';
			// ctx.fill();
			// ctx.stroke();


			

			// bezier curve
			ctx.lineTo(row, column);

			ctx.lineWidth = 5;
			ctx.strokeStyle = 'blue';
			ctx.stroke();

	}
};


squared = function (pixels, args) {
    var d = pixels.data;
    whitePixels = [];
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] =Math.pow(r/255,power)*255
      d[i+1] =Math.pow(g/255,power)*255
      d[i+2] =Math.pow(b/255,power)*255
      if (d[i]+d[i+1]+d[i+2] != 255*3)
      {
        d[i]=d[i+1]=d[i+2]=0
      }
      else
      {
        whitePixels.push(i)
      }

    }
    for (var j = whitePixels.length - 1; j >= 0; j--) {
      i = whitePixels[j]
      k      = i/(w*4)
	  column = Math.ceil(k)
	  row    = w*(k-Math.floor(k))

      if (j != Math.floor(whitePixels.length/2))
      {
        d[i]=d[i+1]=d[i+2]=0
      }
      else if(Math.abs(column-window.place[1])>50)
      {
		window.place = [row,column]
      }
  	}
};
webcamToVideo()
window.setInterval(videoToCanvas,50)
filter = squared