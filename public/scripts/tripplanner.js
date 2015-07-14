function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days = [], currentDay;

$(document).ready(function () {

	$.get('/days', function (data) {
		data.forEach(function(day){
			currentDay = new Day();
			
			eachKeyValue(day,function (key, val) {
				if(key === 'hotel' && val !== null) currentDay[key] = new Hotel(val, true)
				else if(key === 'restaurants'){
					currentDay[key] = val.map(function(rest){
						return new Restaurant(rest, true);
					});
				}
				else if(key === 'thingsToDo'){
					currentDay[key] = val.map(function(thing){
						return new ThingToDo(thing, true);
					});
				}
				else{
					currentDay[key] = val;
				}
				
			});
			days[0].switchTo();
			console.log(currentDay);

		})
		
		currentDay.$button.addClass('current-day');
	})
});