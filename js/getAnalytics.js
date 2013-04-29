
function displayAnalytics(){
    /* Screen information */
    $.ajax({
        type: "get",
        data: null,
        url: RAMEN_PATH.server + "/screens/" + currentTask.prototype_id + "_" + ,
        success: function(data){


        } 
    });
    /* Questionnaire results */
}

/* Updates the heatmap based upon the newly selected screen */
function updateHeatmap(){
    var id = $("#heatmapScreenSelect").
}