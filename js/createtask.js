var isTurked = false;
var currentTask;

function setupTaskCreate(){
    /* Set Start and End Screen options based on the current prototype */
    var startScreenInput = $("#startScreenInput");
    var endScreenInput = $("#endScreenInput");
    for(var i = 0; i<currentPrototype.screens.length; i++){
        var name = currentPrototype.screens[i].name;
        var screen_id = currentPrototype.screens[i].screen_id;
        
        var start_option = $("<option>");
        start_option.attr("value", screen_id);
        start_option.html(name);
        startScreenInput.append(start_option);

        var end_option = $("<option>");
        end_option.attr("value", screen_id);
        end_option.html(name);
        endScreenInput.append(end_option);
    }
}

/* Triggered when form is submitted */
function createTask(){
    var name = $("#taskNameInput").val();
    var description = $("#taskDescInput").val();
    var start_screen_id = $('#startScreenInput option:selected').attr("value");
    var end_screen_id = $('#endScreenInput option:selected').attr("value");

    $.ajax({
        type: "post",
        data: {"prototype_id": currentPrototype._id,
                "name": name, 
                "description": description, 
                "start_screen_id": start_screen_id,
                "end_screen_id": end_screen_id
            },
        url: RAMEN_PATH.server + "/tasks",
        success: function(data){
            console.log(data);
            currentTask = data;
            $("#try-created-task").attr("rel", RAMEN_PATH.server + "/tasks/view/" + currentTask._id);
            $("#15 .nav").html(currentTask.name);
        } 
    });

    //TODO: Send Turk info to node

    displayScreen("15");
}

function toggleTurkOptions(){
    isTurked = !isTurked;
    if(isTurked){
        $(".turk").css("display", "block");
        $("#turkToggleBtn").html("Disable Turk");
    }
    else{
        $(".turk").css("display", "none");
        $("#turkToggleBtn").html("Enable Turk");
    }
}