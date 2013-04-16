var routeclickables = function(){
  var canvas, context;
  var clickAreaIndex = 0;
  var screenIndex = 0;
  var screens = [];
  var routing = false;



  this.setup = function(){
     canvas = document.getElementById("c-route-clickable-area");
     context = canvas.getContext("2d");

     /* Set the canvas width and height according to the phone size */
     canvas.width = $(window).width();
     canvas.height = $(window).height() - 40; //FIXME: 40 is the height of nav-spacer-1


    /* Get screens array from prototype */
    screens = prototype.screens;

     /* Initially draw the canavs */
     update();

     /* Draw the routing list - we only need to do this once */
     drawRoutingList();
  }


  /* Updates the navigation button text appropriately as well as 
   * Updates the click areas given the current state */
  function update(){
    drawClickAreas();
    drawButtons();
  }

  function drawClickAreas(){
    /* Clear the canvas */
    context.clearRect(0,0,canvas.width, canvas.height);

    var clickAreas = screens[screenIndex].clickableAreas;

    /* Draw the click areas */
    for(var i=0; i<clickAreas.length; i++){
      var clickArea = clickAreas[i];

      /* Already routed areas */
      if(i<clickAreaIndex){
        context.fillStyle = "#EEF";
        /* TODO: Draw route-to text */
      }

      /* The area we are currently routing */
      else if(i===clickAreaIndex){
        context.fillStyle = "#FEE";
      }

      /* Areas that have yet to be routed */
      else{
        context.fillStyle = "#EEE";
      }

      context.fillRect(clickArea.x, clickArea.y, clickArea.width, clickArea.height);
    }

  }

  /* Redraws the undo and next buttons based on the current state */
  function drawButtons(){

  }

  /* Draws the routing list dynamically */
  function drawRoutingList(){
    /* Traverse through the images in the hidden image store and add them to the routing list */  
    $(".stored-img").each(function(i, img){
      var screen_id = img.id;

      var screen = $("<li>");
      screen.attr("id", screen_id);
      screen.attr("onclick", "r.assignRoute(this.id)")

      var screenname = $("<p>");
      screenname.html(getScreenNameById(screen_id));

      /* Append the image and its name to the screen */
      screen.append(img);
      screen.append(screenname);
      
      /* Append the screen to the list */
      $("#route-list").append(screen);
    });
  }

  /* Given a screen id, returns the screens name if found */
  /* TODO: Fix return value on error, check errors.... */
  function getScreenNameById(screen_id){
    for(var i=0; i<screens.length; i++){
      if(screens[i].screen_id === screen_id){
        return screens[i].name;
      }
    }

    return "INVALID";
  }


  /* Updates the prototype datamodel assinging the clickarea's destination with the route */
  this.assignRoute = function(screen_id){
    prototype.screens[screenIndex].clickableAreas[clickAreaIndex].destination_id = screen_id;
  
    console.log(JSON.stringify(prototype));
    console.log("////////////////////////////////////////////");

    /* Step forward in the process */
    this.next();
  }

  /* Advances to the next state in the process */
  this.next = function(screen_id, screenName){
    if(routing){
      displayScreen("9");
      routing = false;
      clickAreaIndex++;

      /* Advance to the next screen */
      if(clickAreaIndex === screens[screenIndex].clickableAreas.length){
        screenIndex++;
        clickAreaIndex = 0;
      }

      /* Routing complete case */
      if(screenIndex === screens.length){
        displayScreen("11");
      }
      else{
        update();
      }

    }
    else{
      displayScreen("10");
      routing = true;
    }
  }

  /* If possible, removes the route that was created for the current screen */
  this.undo = function(){
    if(clickAreaIndex > 0)
      clickAreaIndex--;
    routing = false;
    update();
  }
}