var setclickables = function(){

  var canvas, context;
  var clickAreas = [];
  var currentClickArea;
  var closeImg;
  var screenImg;

  /* This array is filled in by the server when the screens are created
  /* Each element of this array contains: 
  /* screen id and screen name */
  var currentScreenIndex = 0;

  var intervalId;

  var scaleFactor;

  this.setup = function(){
    canvas = document.getElementById("c-set-clickable-area");
    context = canvas.getContext("2d");

    /* Set the canvas width and height according to the phone size */
    canvas.width = screen_width;
    canvas.height = screen_height - 40; //FIXME: 40 is the height of nav-spacer-2

    /* Listen to touch interations on the canvas */
    canvas.addEventListener("touchstart",    beginDrag);
    canvas.addEventListener("touchmove",     updateDrag);
    canvas.addEventListener("touchend",      endDrag);

    closeImg = new Image();
    closeImg.src = "img/glyphicons_free/glyphicons/png/glyphicons_192_circle_remove.png";
    screenImg = new Image();
    screenImg.src = $("#"+prototype.screens[0].screen_id).attr("src");  
    screenImg.onload = function(){
      /* Redraw click areas at 60 FPS */
      var intervalId = window.setInterval(drawClickAreas, 15);
    }
  }

  this.remove = function(){
    canvas.removeEventListener("touchstart",    beginDrag);
    canvas.removeEventListener("touchmove",     updateDrag);
    canvas.removeEventListener("touchend",      endDrag);
    window.clearInterval(intervalId);
  }

  /* Initializes a click area */
  function clickArea(x, y, width, height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.destination_id = "";
  }

  function beginDrag(ev){
      /* Only allow 1 finger gesture */
      if (ev.targetTouches.length == 1) {
          var touch = ev.targetTouches[0];
          currentClickArea = new clickArea(touch.pageX/scaleFactor, (touch.pageY-40)/scaleFactor, 0, 0);
      }
  }

  function updateDrag(ev){
      /* Only allow 1 finger gesture */
      if (ev.targetTouches.length == 1) {
          var touch = ev.targetTouches[0];
          currentClickArea.width = (touch.pageX/scaleFactor)-currentClickArea.x;
          currentClickArea.height = (touch.pageY/scaleFactor)-currentClickArea.y-(40/scaleFactor);
      }
  }

  function endDrag(ev){
      /* If the area is big enough, save it */
      if(currentClickArea.width>0 && currentClickArea.height>0)
          clickAreas.push(currentClickArea);
      /* Otherwise, consider the interaction as a tap */
      else{
        console.log("Tap");
        var touch = ev.changedTouches[0];
        var touchx = touch.pageX; 
        var touchy = touch.pageY-40;
        for(var i=0; i<clickAreas.length; i++){
          dloc = getDeleteLocation(clickAreas[i]);
          if(touchx >= dloc.x && 
            touchy >= dloc.y && 
            touchx <= dloc.x+closeImg.width && 
            touchy <= dloc.y+closeImg.height)
            clickAreas.splice(i,1);
        }
      }

      currentClickArea = null;

      /* Write the protototype to the console */
      console.log("current screen index: " + currentScreenIndex);
      console.log(JSON.stringify(prototype));
      console.log("////////////////////////////////////////////");
  }

  /* Given a click area, returns the location of its delete button */
  function getDeleteLocation(clickArea){
    return {"x": (scaleFactor*(clickArea.x+clickArea.width)-10), 
            "y": (scaleFactor*clickArea.y)-10
    };
  }

  function drawClickAreas(){
    /* Clear the canvas */
    context.clearRect(0,0,canvas.width, canvas.height);

    /* Draw the current screen in the background */
    var scaledWidth, scaledHeight;
    scaledWidth = canvas.width;
    scaledHeight = screenImg.height * canvas.width / screenImg.width;
    context.drawImage(screenImg,0,0,scaledWidth, scaledHeight);

    /* Set the scale factor */
    scaleFactor = scaledWidth/screenImg.width;

    /* Draw saved click areas */
    clickAreas.forEach(function(clickArea){
      /* Draw the clickable rectangle */
      context.fillStyle = "rgba(186, 227, 224, .5)";
      context.fillRect(clickArea.x*scaleFactor, clickArea.y*scaleFactor, clickArea.width*scaleFactor, clickArea.height*scaleFactor);
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      /* Draw the delete button */
      context.drawImage(closeImg, scaleFactor*(clickArea.x+clickArea.width)-10, scaleFactor*clickArea.y-10);

    });

    /* Draw the current click area, if it exists */
    if(currentClickArea){
      context.fillStyle = "rgba(255, 255, 255, .5)";
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      context.fillRect(currentClickArea.x*scaleFactor, currentClickArea.y*scaleFactor, currentClickArea.width*scaleFactor, currentClickArea.height*scaleFactor); 
    }
  }

  /* Saves the current screen's clickable areas, advances to the next screen */
  this.saveScreen = function(){
    console.log("saving the screen!");
    prototype.screens[currentScreenIndex].clickableAreas = clickAreas;
    clickAreas = [];

    /* On completion, begin the routing phase */
    if(currentScreenIndex+1 == prototype.screens.length){
      displayScreen("8");
      return;
    }

    /* Otherwise display the next screen */
    screenImg.src = $("#"+prototype.screens[currentScreenIndex+1].screen_id).attr("src");  
    screenImg.onload = function(){
      /* Advance to next screen */
      currentScreenIndex++;
    }
  }

  /* Clears all of the current screen's clickable areas */
  this.clearScreen = function(){
    clickAreas = [];
  }

}