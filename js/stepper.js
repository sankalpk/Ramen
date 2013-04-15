/* Displays the specified screen, and hides all of the others */
function displayScreen(screenNum){
    var steps = document.getElementsByClassName("step");
    for(var i=0; i<steps.length; i++){
        if(steps[i].id == screenNum)
            steps[i].style.display = "block";
        else
            steps[i].style.display = "none";
    }
}