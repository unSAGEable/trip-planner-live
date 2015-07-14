var Restaurant;

$(document).ready(function () {
	Restaurant = function (data,onStart) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.restaurants.push(this);

		if(!onStart){
			$.ajax({
			    type: 'post',
			    url: '/days/' + currentDay.number + '/restaurants',
			    dataType: 'json',
			    data: {name: self.name},
			    success: function (responseData) {
			        console.log(responseData);
			    },
			});
		}
	}

	Restaurant.prototype = generateAttraction({
		icon: '/images/restaurant.png',
		$listGroup: $('#my-restaurants .list-group'),
		$all: $('#all-restaurants'),
		all: all_restaurants,
		constructor: Restaurant
	});

	Restaurant.prototype.delete = function () {
		var index = currentDay.restaurants.indexOf(this),
			removed = currentDay.restaurants.splice(index, 1)[0];
		removed
			.eraseMarker()
			.eraseItineraryItem();


		$.ajax({
		    type: 'delete',
		    url: '/days/' + currentDay.number + '/restaurant/' + index,
		    dataType: 'json',
		    success: function (responseData) {
		        console.log(responseData);
		    },
		});
	};
});