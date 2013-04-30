function showTaskDetails(){
    $("#taskName").html(currentTask.name);
    $("#taskDesc").html(currentTask.description);
    //$("#taskStartScreen").html();
    //$("#taskEndScreen").html(); 
    var taskURL = RAMEN_PATH.server + "/tasks/view/" + currentTask._id;
    console.log(taskURL);
    $("#try-task").attr("rel", taskURL);
}