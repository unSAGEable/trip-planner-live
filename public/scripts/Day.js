var Day;

$(document).ready(function () {

	// Day constructor
	// properties for each of trip planner attractions
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		// adds itself to number of days
		this.number = days.push(this);

		this.buildButton()
			.drawButton();

		return this
	}

	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}

		// erases all current attractions
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	function deleteCurrentDay () {
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				// handles removing last day
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
		}
	};

	$('#add-day').on('click', function () {
		var newDay = new Day();
		var dayNumber = {};
		dayNumber.number = newDay.number;

		$.ajax({
		    type: 'post',
		    url: '/days',
		    dataType: 'json',
		    data: dayNumber,
		    success: function (responseData) {
		        console.log(responseData);
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});

		$.get('/days', function (data) {console.log('GET response data', data)})
	});

	$('#day-title > .remove').on('click', function(){
		$.ajax({
		    type: 'delete',
		    url: '/days/'+ currentDay.number,
		    success: function (responseData) {
		    	deleteCurrentDay();
		        console.log(responseData);
		    }
		});
		
	});

	$('#day-title > .reset').on('click', function(){
		$.post('/days/reset', function (data) {
			while(days.length !== 1){
				deleteCurrentDay();
			}
			console.log(data)
		})

	})
});












