function namePrototype(){
    var name = $("#prototype-name").val();
    console.log(name);
    $.ajax({
        type: "post",
        data: {name: name},
        url: RAMEN_PATH.server + "/prototypes/init",
        success: function(data){
            prototype._id = data._id;
            prototype.name = data.name;
            prototype.creator_id = data.creator_id;
            prototype.screens = [];
            displayScreen("4");
        } 
    });
}