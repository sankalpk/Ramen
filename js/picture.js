function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 			50,
		destinationType: 	navigator.camera.DestinationType.DATA_URL, 
		targetWidth: 		320,
		correctOrientation: true
	});
}

function onPhotoDataSuccess(imageData) {
    /* Fill in all screen-preview image data */
    var imgs = document.getElementsByClassName("screen-preview");
    for(var i=0; i<imgs.length; i++){
        var img = imgs[i];
        img.style.display = 'block';
        img.src = "data:image/jpeg;base64," + imageData;
    }

    /* Show the naming screen */
    displayScreen("5");
}

function onFail(message) {
    alert('Failed because: ' + message);
}

/* Uploads the named screen from the preview to the database */
function saveNamedScreen(){
    var imageData = document.getElementsByClassName("screen-preview")[0].src;
    var screen_name = $("#screen-name").val();

    /* Upload the image to the server */
    $.ajax({
        type: "put",
        data: {"screen_name": name, "image": imageData},
        url: RAMEN_PATH.server + "/prototypes/" + prototype._id + "/addScreen",
        success: function(data){
            $("#img-store").append("<img id='" + data.screen_id + "'src='" + imageData + "'>");
        } 
    });

    /* Clear the form for later use */
    document.getElementById("screen-name").value = "";
}


function saveAndCapture(){
    saveNamedScreen();
    capturePhoto();
}

function saveAndFinish(){
    saveNamedScreen();
    displayScreen("6");
}