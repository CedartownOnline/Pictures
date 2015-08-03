var polkhistApp = angular.module('polkhistApp', ['ngRoute']);
	
	// configure our routes
	polkhistApp.config(function($routeProvider) {
		$routeProvider
		// route for the home page
			.when('/', {
				templateUrl: '/pages/home.html'
			})
			// route for the about page
			.when('/about', {
				templateUrl: '/pages/about.html'
			})
			// route for the Links page
			.when('/calendar', {
				templateUrl: '/pages/calendar.html'
			})
			// route for the Links page
			.when('/links', {
				templateUrl: '/pages/links.html',
				controller: 'LinksController'
			})
			// route for the museum page
			.when('/museum', {
				templateUrl: '/pages/museum.html'
			})
			// route for the museum page
			.when('/shop', {
				templateUrl: '/pages/shop.html'
			})
			// route for the info page
			.when('/info', {
				templateUrl: '/pages/info.html'
			})
			// route for the Membership page
			.when('/membership', {
				templateUrl: '/pages/membership.html',
				controller: 'MembershipController'
			})
			// route for the contact page
			.when('/contact', {
				templateUrl: '/pages/contact.html'
			});
	});
	
	// create the controller and inject Angular's $scope
	polkhistApp.controller('MainController', function($scope,  $http) {
		$http.get('/data/calendar.json').then(function(res) {
			var events = res.data;
			var len = events.length;
			var cdate;
			$scope.events = [];
			for (i = 0; i < len; i++) {
			    var event = events[i]; 
				cdate = moment(event.date);
				ddate=0 - moment().diff(cdate,'days');
				if (ddate >= 0) {
					event.interDate = cdate;					
					if (ddate == 0) {
						if (!events[i].tags) {event.tags=[];}
					    event.tags.push("Today");
						$scope.happeningToday = event;						
						$scope.showAlert=true;
					}
					$scope.events.push(event);
				}
			}
			$scope.events.sort(function(a, b) {
				return a.interDate > b.interDate
			});
		});
	});
	
	
	polkhistApp.controller('LinksController', function($scope, $http) {
		$http.get('/data/links.json').then(function(res) {
			$scope.links = res.data;
		});
	});
	
	polkhistApp.controller('MembershipController', function($scope, $http) {
		$http.get('/data/membership.json').then(function(res) {
			$scope.rates = res.data;
		});
	});
	