angular
	.module('ngCribs')
	.controller('cribsController', function ($scope, cribsFactory) {
		const HOME_PAGE = 1;
		const ADD_PAGE = 2;
		const OPEN_PAGE = 3;
		$scope.currentTab = HOME_PAGE;
		$scope.cribs = [];
		$scope.addPostPopup = false;
		$scope.openPost = false;
		$scope.newListing = {};

		$scope.addCrib = async function () {
			try {
				$scope.newListing.coverImage = await imageExtractor();
				console.log(document.querySelector("#coverImage"))
				$scope.cribs.push($scope.newListing);
				$scope.setTab(HOME_PAGE);
				await cribsFactory.addPost($scope.newListing);
				$scope.newListing = {};
			} catch (e) {
				console.log(e);
			}
		}

		$scope.editCrib = function (crib) {
			$scope.editListing = true;
			$scope.existingListing = crib;
		}

		$scope.saveCribEdit = function () {
			$scope.existingListing = {};
			$scope.editListing = false;
		}

		$scope.deleteCrib = function (listing) {
			var index = $scope.cribs.indexOf(listing);
			$scope.cribs.splice(index, 1);
			$scope.existingListing = {};
			$scope.editListing = false;
		}

		cribsFactory.getCribs().success(function (data) {
			console.log(data)
			$scope.cribs = data;
		}).error(function (error) {
			console.log(error);
		});

		$scope.setCrib = function (crib) {
			$scope.currentCrib = crib;
			$scope.setTab(OPEN_PAGE);
		}

		$scope.backHome = function () {
			delete $scope.currentCrib;
			$scope.openPost = false;
		}

		$scope.setDefaultOnClose = function () {
			$scope.addListing = !$scope.addListing;
			$scope.newListing = {}
			$scope.setTab(HOME_PAGE);
		}

		$scope.setTab = function (tab) {
			if (tab === HOME_PAGE) {
				$scope.currentTab = tab;
				return;
			}
			if (tab === ADD_PAGE) {
				$scope.currentTab = tab;
				return;
			}
			if (tab === OPEN_PAGE) {
				$scope.currentTab = tab;
				return;
			}
		}

		const toBase64 = file => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});

		async function imageExtractor() {
			const file = document.querySelector('#coverImage').files[0];
			console.log(file)
			$scope.newListing.coverImageType = file.type;
			return await toBase64(file);
		}
	});