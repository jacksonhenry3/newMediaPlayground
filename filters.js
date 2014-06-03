var video        = document.querySelector("#vid"),
canvas           = document.querySelector('#liveFeed'),
	w              = canvas.width,
	h              = canvas.height,
	ctx            = canvas.getContext('2d');

var streamVideoToCanvas = function(stream) {
	// stream user media
	video.src = window.URL.createObjectURL(stream);
	// place media on canvas
	ctx.drawImage(video, 0, 0);
}

function onCameraFail() {
	ctx.textAlign = "center";
	ctx.font      = "20px Georgia";
	ctx.fillText("Camera did not work.",w/2,h/2);
};

n = navigator
n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
n.getUserMedia({video:true}, streamVideoToCanvas(stream), onCameraFail);
