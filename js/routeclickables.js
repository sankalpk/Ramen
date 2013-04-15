var canvas, context;
var clickAreas = [];
var clickAreaIndex = 0;

var state;

function setup_routeclickables(){
   canvas = document.getElementById("c-route-clickable-area");
   context = canvas.getContext("2d");

   /* Set the canvas width and height according to the phone size */
   canvas.width = document.width;
   canvas.height = document.height - 40; //FIXME: 40 is the height of nav-spacer-1

   /* Initially draw the canavs */
   update();

   /* Initialize the state */
   state = 0;
}


/* Updates the navigation button text appropriately as well as 
 *  updates the click areas given the current state */
function update(){
  drawClickAreas();
}

function drawClickAreas(){
  /* Clear the canvas */
  context.clearRect(0,0,canvas.width, canvas.height);

  /* Draw the click areas */
  for(var i=0; i<clickAreas.length; i++){
    var clickArea = clickAreas[0];

    /* Already routed areas */
    if(i<clickAreaIndex){
      context.fillStyle = "#EEE";
    }

    /* The area we are currently routing */
    else if(i===clickAreaIndex){
      context.fillStyle = "#EEE";
    }

    /* Areas that have yet to be routed */
    else{
      context.fillStyle = "#EEE";
    }

    context.fillRect(clickArea.x, clickArea.y, clickArea.width, clickArea.height);
  }

}

/* Advances to the next state in the process */
function next(){

}

/* If possible, removes the route that was created for the current screen */
function undo(){

}