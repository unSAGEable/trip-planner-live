var Hotel;

$(document).ready(function () {
	Hotel = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}



		currentDay.hotel = this;


		$.ajax({
		    type: 'post',
		    url: '/days/' + currentDay.number + '/hotel',
		    dataType: 'json',
		    data: {name: self.name},
		    success: function (responseData) {
		    	self.buildMarker()
					.drawMarker()
					.buildItineraryItem()
					.drawItineraryItem();
		        console.log(responseData);
		    },
		});
	}

	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel
	});

	Hotel.prototype.delete = function () {
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;
	};
});