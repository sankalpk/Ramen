
//Given current task, f 
function displayAnalytics(){
    /* Screen information */
    $.ajax({
        type: "get",
        data: null,
        url: RAMEN_PATH.server + "/prototypes/" + currentTask.prototype_id,
        success: function(data){
            currentPrototype = data;
            /* Set the options for the heatmap */
            var screenSelect = $("#heatmapScreenSelect");
            for(var i = 0; i< data.screens.length; i++){
                var screenOption = $("<option>");
                screenOption.attr("value", data.screens[i].screen_id);
                screenOption.html(data.screens[i].name);
                screenSelect.append(screenOption);
            }
        } 
    });

    /* Question Results */
    $("#answer-1").html(currentTask.analytics.q1_average + " / 5");
    $("#answer-2").html(currentTask.analytics.q2_average + " / 5");
    $("#answer-3").html(currentTask.analytics.q3_average + " / 5");
    $("#answer-4").html(currentTask.analytics.q4_average + " / 5");
    $("#answer-5").html(currentTask.analytics.q5_average + " / 5");

    /* Time Results */
    console.log(Math.round( currentTask.analytics.average_time * 10 ) / 10);
    $("#time-elapsed").html(currentTask.analytics.average_time + " seconds");

    /* Total Participants */
    $("#total-participants").html(currentTask.analytics.num_people + " people");
}

/* Updates the heatmap based upon the newly selected screen */
function updateHeatmap(screen_id){
    //Get image for the heatmapped screen
    $.ajax({
        type: "get",
        data: null,
        url: RAMEN_PATH.server + "/screens/" + currentPrototype._id + "_" + screen_id,
        success: function(data){
            //Render the screen on the canvas
            var img = new Image();
            img.src = data.imageData;
            img.onload = function(){
                var width = img.width;
                var height = img.height;
                var scaleFactor = 320/width;

                /* Update the tap data */
                var tapdata = [];
                heatmap.store.setDataSet({max: 5, data: []});
                //heatmap.store.addDataPoint(10, 20);
                //heatmap.store.addDataPoint(20, 30);
                var taps = currentTask.analytics.taps;
                for(var i=0; i<taps.length; i++){
                    if(screen_id === taps[i].screen_id){
                        tapdata.push({"x": taps[i].x*scaleFactor,
                                    "y": taps[i].y*scaleFactor,
                                    "count": 1});
                    }
                }

                heatmap.store.setDataSet({"max": 5, "data": tapdata});

                /* Draw image */
                document.getElementById("heatmap").getContext("2d").drawImage(img,0,0,320,height*scaleFactor);
            };
        }
    });
}