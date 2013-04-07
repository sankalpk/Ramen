function onPhotoDataSuccess(imageData) {
  var myImage = document.getElementById('myImage');
  myImage.style.display = 'block';
  myImage.src = "data:image/jpeg;base64," + imageData;
}

function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 			50,
		destinationType: 	navigator.camera.DestinationType.DATA_URL, 
		targetWidth: 		320,
		correctOrientation: true
	});
}

function onFail(message) {
  alert('Failed because: ' + message);
}
