var myTasks;

function showTaskList(){
    /* Get Prototype list */
    $.ajax({
    type: "get",
    data: null,
    url: RAMEN_PATH.server + "/tasks/prototype/"+currentPrototype._id,
    success: function(data){
        if(data){
            myTasks = data;
            var taskList = $("#task-list");
            for(var i=0; i<data.length; i++){
              /* Add a list element for every exisiting task */
                var taskListEl = $("<li>");
                taskListEl.html(data[i].name);
                taskListEl.attr("id", data[i]._id);
                taskListEl.attr("onclick", "getTaskDetail("+i+")");
                
                taskList.append(taskListEl);
            }
        }
    } 
    });
}

function getTaskDetail(index){
    currentTask = myTasks[index];
    displayScreen('16');
}