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

    if(screenNum === "7"){
        s = new setclickables();
        s.setup();
    }

    else if(screenNum === "8"){
        r = new routeclickables();
        r.setup();
    }
    else if(screenNum === "11"){

    }
    else if(screenNum === "12"){
        updatePrototypeList();
    }
    else if(screenNum === "13"){
        $("#13 .nav").html(currentPrototype.name);
    }
    else if(screenNum === "14"){
        $("#14 .nav").html("Task for " + currentPrototype.name);
        setupTaskCreate();
    }
    else if(screenNum === "16"){
        $("#16 .nav").html(currentTask.name);
        showTaskDetails();   
    }
    else if(screenNum === "17"){
        $("#17 .nav").html("Tasks for " + currentPrototype.name);
        showTaskList();
    }
}