function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 			50,
		destinationType: 	navigator.camera.DestinationType.DATA_URL, 
		targetWidth: 		320,
		correctOrientation: true
	});
}

/* Fill in all screen-preview image data */
function onPhotoDataSuccess(imageData) {
    var imgs = document.getElementsByClassName("screen-preview");
    for(var i=0; i<imgs.length; i++){
        var img = imgs[i];
        img.style.display = 'block';
        img.src = "data:image/jpeg;base64," + imageData;
    }

    /* Show the naming screen */
    displayScreen("1");
}

function onFail(message) {
    alert('Failed because: ' + message);
}

/* Uploads the named screen from the preview to the database */
function saveNamedScreen(){
    var imageData = document.getElementsByClassName("screen-preview")[0].src;
    var name = document.getElementById("screen-name-form").value;

    /* TODO: AJAX Here */

    /* Clear the form for later use */
    document.getElementById("screen-name-form").value = "";
}
