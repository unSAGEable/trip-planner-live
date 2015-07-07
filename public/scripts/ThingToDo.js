var ThingToDo;

$(document).ready(function () {
	// thing to do constructor
	ThingToDo = function (data, onStart) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.thingsToDo.push(this);

		if(!onStart){
			$.ajax({
			    type: 'post',
			    url: '/days/' + currentDay.number + '/thingsToDo',
			    dataType: 'json',
			    data: {name: self.name},
			    success: function (responseData) {
			        console.log(responseData);
			    },
			});
		}

	}

	ThingToDo.prototype = generateAttraction({
		icon: '/images/star-3.png',
		$listGroup: $('#my-things-to-do .list-group'),
		$all: $('#all-things-to-do'),
		all: all_things_to_do,
		constructor: ThingToDo
	});

	ThingToDo.prototype.delete = function () {
		var index = currentDay.thingsToDo.indexOf(this),
			removed = currentDay.thingsToDo.splice(index, 1)[0];
		removed
			.eraseMarker()
			.eraseItineraryItem();

		$.ajax({
		    type: 'delete',
		    url: '/days/' + currentDay.number + '/thingsToDo/' + index,
		    dataType: 'json',
		    success: function (responseData) {
		        console.log(responseData);
		    },
		});
	};
});
