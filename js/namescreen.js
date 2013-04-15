function nameScreen(){
    var name = $("#screen-name").value;
    $.ajax({
        type: "post",
        data: {"name": name},
        url: RAMEN_PATH.server + "/prototypes/init",
        success: function(data){
            window.location
        } 
    });
}