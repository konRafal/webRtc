// Define local variables associated with video resolution selection
// buttons in the HTML page

var qvgaButton = document.querySelector("button#qvga");
var vgaButton = document.querySelector("button#vga");
var hdButton = document.querySelector("button#hd");

// Video element in the HTML5 page
var video = document.querySelector("video");

// The local MediaStream to play with
var stream;

//Look after different browser vendors' ways of calling the getUserMedia()
//API method:
//Opera --> getUserMedia
//Chrome --> webkitGetUserMedia
//Firefox --> mozGetUserMedia

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
						|| navigator.mozGetUserMedia;

// Use constraints to ask for a video-only MediaStream:
var constraints = {audio: false, video: true};

// Callback to be called in case of success...
function successCallback(gotStream) {

	// Note: make the returned stream available to console for inspection
	window.stream = gotStream;

	if (window.URL) {
		// Chrome case: URL.createObjectURL() converts a MediaStream to a blob URL
		video.src = window.URL.createObjectURL(stream);
	} else {
		// Firefox and Opera: the src of the video can be set directly from the stream
		video.src = stream;
	}

// We're all set. Let's just play the video out!
	video.play();
}

// Callback to be called in case of failures...
function errorCallback(error){
console.log("navigator.getUserMedia error: ", error);
}

var qvgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 240
    }
  }
};

var vgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 480
    }
  }
};

var hdConstraints  = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 960
    }
  }
};

qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vgaButton.onclick = function(){getMedia(vgaConstraints)};
hdButton.onclick = function(){getMedia(hdConstraints)};

function getMedia(constraints){
  if (!!stream) {
    video.src = null;
    stream.stop();
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
