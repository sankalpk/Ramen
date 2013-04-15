var canvas, context;
var clickAreas = [];
var currentClickArea;
var closeImg;

/* This array is filled in by the server when the screens are created
/* Each element of this array contains: 
/* screen id and screen name */
var screens = [];
var currentScreenIndex;


function setup_setclickables(){
   canvas = document.getElementById("c-set-clickable-area");
   context = canvas.getContext("2d");

   /* Set the canvas width and height according to the phone size */
   canvas.width = document.width;
   canvas.height = document.height - 40; //FIXME: 40 is the height of nav-spacer-2

   /* Listen to touch interations on the canvas */
   canvas.addEventListener("touchstart",    beginDrag);
   canvas.addEventListener("touchmove",     updateDrag);
   canvas.addEventListener("touchend",      endDrag);

   /* Redraw click areas at 60 FPS */
   window.setInterval(drawClickAreas, 15);

    closeImg = new Image();
    closeImg.src = "img/glyphicons_free/glyphicons/png/glyphicons_192_circle_remove.png";
}

/* Initializes a click area */
function clickArea(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.destinationId = "";
}

function beginDrag(ev){
    /* Only allow 1 finger gesture */
    if (ev.targetTouches.length == 1) {
        var touch = ev.targetTouches[0];
        currentClickArea = new clickArea(touch.pageX, touch.pageY-40, 0, 0);
    }
}

function updateDrag(ev){
    /* Only allow 1 finger gesture */
    if (ev.targetTouches.length == 1) {
        var touch = ev.targetTouches[0];
        currentClickArea.width = touch.pageX-currentClickArea.x;
        currentClickArea.height = touch.pageY-currentClickArea.y-40;
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
}

/* Given a click area, returns the location of its delete button */
function getDeleteLocation(clickArea){
  return {"x": clickArea.x+clickArea.width-10, "y":clickArea.y-10};
}

function drawClickAreas(){
  /* Clear the canvas */
  context.clearRect(0,0,canvas.width, canvas.height);

  /* Draw the current screen in the background */

  /* Draw saved click areas */
  clickAreas.forEach(function(clickArea){
    /* Draw the clickable rectangle */
    context.fillStyle = "#EEE";
    context.fillRect(clickArea.x, clickArea.y, clickArea.width, clickArea.height);
    /* Draw the delete button */
    context.drawImage(closeImg, clickArea.x+clickArea.width-10, clickArea.y-10);

  });

  /* Draw the current click area, if it exists */
  if(currentClickArea){
    context.fillStyle = "#FFF";
    context.fillRect(currentClickArea.x, currentClickArea.y, currentClickArea.width, currentClickArea.height); 
  }
}

/* Saves the current screen's clickable areas, advances to the next screen */
function saveScreen(){
  screens[currentScreenIndex].clickableAreas = clickAreas;
  clickAreas = [];
  currentScreenIndex++;
}

/* Clears all of the current screen's clickable areas */
function clearScreen(){
  clickAreas = [];
}