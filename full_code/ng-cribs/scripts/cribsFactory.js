angular
	.module('ngCribs')
	.factory('cribsFactory', function ($http) {

		function getCribs() {
			return $http.get('/get-posts');
		}

		function addPost(post) {
			console.log(post);
			return $http.post('/add-post', post);
		}

		return {
			getCribs: getCribs,
			addPost: addPost
		}
	});