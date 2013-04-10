function captureAudio(){
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
}

function captureSuccess(mediaFiles){
    var media = new Media(mediaFiles[0].fullPath.slice(8));
    media.play();
}

function captureError(message) {
  alert('Failed because: ' + message);
}

function mediaError(message){
    alert('Failed because: ' + message);

}
