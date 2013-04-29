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
        s.remove();
        s = null;
        r = new routeclickables();
        r.setup();
    }
    else if(screenNum === "11"){
        r = null;
        $("#prototype-url").attr("value", RAMEN_PATH.server + "/prototypes/view/" + prototype._id);
        $("#try-created-proto").attr("rel", RAMEN_PATH.server + "/prototypes/view/" + prototype._id)
    }
    else if(screenNum === "12"){
        updatePrototypeList();
    }
    else if(screenNum === "13"){
        $("#13 .nav").html(currentPrototype.name + "<button class='btn' onclick='displayScreen(2);'>Home</button>");
    }
    else if(screenNum === "14"){
        $("#14 .nav").html("Task for " + currentPrototype.name + "<button class='btn' onclick='displayScreen(2);'>Home</button>");
        setupTaskCreate();
    }
    else if(screenNum === "15"){ 
    }
    else if(screenNum === "16"){
        $("#16 .nav").html(currentTask.name + "<button class='btn' onclick='displayScreen(2);'>");
        showTaskDetails();   
    }
    else if(screenNum === "17"){
        $("#17 .nav").html("Tasks for " + currentPrototype.name + "<button class='btn' onclick='displayScreen(2);'>Home</button>");
        showTaskList();
    }
    else if(screenNum === "18"){
        $("#18 .nav").html("Analytics for " + currentPrototype.name + "<button class='btn' onclick='displayScreen(2);'>Home</button>");
    }
}