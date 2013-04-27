var myPrototypes;
var currentPrototype;

function updatePrototypeList(){
    /* Get Prototype list */
    $.ajax({
    type: "get",
    data: null,
    url: RAMEN_PATH.server + "/prototypes/",
    success: function(data){
        if(data){
            myPrototypes = data;
            var protoList = $("#prototype-list");

            for(var i=0; i<data.length; i++){
                /* Add a list element for every exisiting prototype */
                var protoListEl = $("<li>");
                protoListEl.html(data[i].name);
                protoListEl.attr("id", data[i]._id);
                protoListEl.attr("onclick", "getPrototypeOptions("+i+")");
                
                protoList.append(protoListEl);
            }

        }
    } 
    });
}

function getPrototypeOptions(index){
    currentPrototype = myPrototypes[index];
    displayScreen('13');
}