/* Displays the specified screen, and hides all of the others */
function displayScreen(screenNum){
    var steps = document.getElementsByClassName("step");
    for(var i=0; i<steps.length; i++){
        if(steps[i].id == screenNum)
            steps[i].style.display = "block";
        else
            steps[i].style.display = "none";
    }


    /* Transition functions 
     * Any step specific functionality should be initiated here */
    if(screenNum === "6"){
        s = new setclickables();
        s.setup();
    }
    else if(screenNum === "8"){
        /* TODO: Add functions to remove listeners/timers */
        r = new routeclickables();
        r.setup();
    }
    else if(screenNum === "11"){

    }
}