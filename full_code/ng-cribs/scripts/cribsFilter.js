angular
	.module('ngCribs')
	.filter('cribsFilter', function () {

		return function (listings, priceInfo) {

			var filtered = [];

			angular.forEach(listings, function (category) {

				if (listings.category === category) {
					filtered.push(listing);
				}
			});

			return filtered;
		}
	});