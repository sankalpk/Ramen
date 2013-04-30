/* if not filled out, displays alert, and does not execute callback */
/* if filled out, executes callback */
function inputRequired(ids, callback)
{
	var formFine = true;
	ids.forEach(function(id){
		var input = $("#"+id).val();
		if(input === ""&&formFine === true) {
			alert("Required form field empty. Please fill them out.");
			formFine = false;
		} 
	});
	if(formFine) callback();
}

function validateTask(callback)
{
	inputRequired(['taskNameInput','taskDescInput'], function(){
		if(isTurked)
		{
			inputRequired(['turkReward','turkMax'], function(){
				var rewardFine = true;
				var turkReward = $("#turkReward").val();
				if(turkReward.match(/^\d{1,3}\.\d{2}$/)==null)
				{
					rewardFine = false;
					alert("Turk reward must be similar to the form 23.15");
				}
				if(rewardFine) callback();
			});
		}
		else callback();
	});
}