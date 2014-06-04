var video     = document.querySelector("#vid"),
	canvas    = document.querySelector('#liveFeed'),
	w         = canvas.width,
	h         = canvas.height,
	ctx       = canvas.getContext('2d'),
	power     = 5;
	window.place = [0,0]
	PreviousRow = 0
	PreviousCol = 0
	divider = 5
	var lineData = [];



	//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("basis-closed");

//The SVG Container
var svgContainer = d3.select("#drawingCanvas")

var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "#42C096")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");
function videoToCanvas()
{
	if (localMediaStream)
	{
		ctx.drawImage(video, 0, 0);
	}
	filterCanvas(filter)
	//The line SVG Path we draw
	if (lineData.length>5)
	{
		lineData.shift()
	}
	lineGraph.attr("d", lineFunction(lineData));
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

			ctx.lineWidth = 1;
			ctx.strokeStyle = 'teal';
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
	  row    = w-w*(k-Math.floor(k))

      if (j != Math.floor(whitePixels.length/2))
      {
        d[i]=d[i+1]=d[i+2]=255
      }
      else 
      {
      		if (Math.abs(PreviousRow-row)>1)
      		{
      			row = PreviousRow+(row-PreviousRow)/divider
      			column = PreviousCol+(column-PreviousCol)/divider
      		}
			window.place = 
			lineData.push({x:row,y:column})
			PreviousRow = row
			PreviousCol = column
      }
  	}
};












webcamToVideo()
window.setInterval(videoToCanvas,50)
filter = squared