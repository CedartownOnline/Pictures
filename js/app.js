var picturesApp = angular.module('picturesApp', ['ngRoute','ui.bootstrap']);

// configure our routes
picturesApp.config(function($routeProvider) {
	$routeProvider
	// route for the home page
		.when('/', {
			templateUrl: '/pages/home.html'
		})
		// route for the pictures page
		.when('/pictures/:path?', {
			templateUrl: '/pages/pictures.html',
			controller: 'picturesController'
		})
		.otherwise({
			redirectTo: "/"
		});
});

// create the controller and inject Angular's $scope
picturesApp.controller('MainController', function($scope, $http) {});

picturesApp.controller('picturesController', function($scope, $http, $routeParams) {
	
	$scope.myInterval = 5000;
    $scope.noWrapSlides = false;
	$scope.directories = [];
	$scope.slides = [];
	
	if ($routeParams.path) {
		$scope.path = $routeParams.path.split("$");
		if ($scope.path[0] == ""){
			$scope.path.shift();
		}
		$scope.dirPath = "/" + $scope.path.join("/");
	}
	else {
		$scope.path = [];
		$scope.dirPath = "";
	}
	$scope.pathString = "/pictures" + $scope.dirPath;
	
	var dirPath = $scope.path.slice();
    dirPath.push("directory.json");
	dirPathString = "/" + dirPath.join("/");
	
	$http.get(dirPathString)
		.then(function(res) {
		   var data = res.data;
	       for (i = 0, len = data.directories.length; i < len; i++){
			   
			   var wpath =  data.directories[i].path;
			   wpath = wpath.split("/")
			   if (wpath[0] == "") {wpath.shift()}
			   wpath=wpath.join("$");
			   data.directories[i].path = "/pictures/" + wpath;
			   
			   if (data.directories[i].files) {
				data.directories[i].fileCount = data.directories[i].files.length;
			   } else {
				 data.directories[i].fileCount = 0;  
			   }
		   }
		   $scope.directories = data.directories;
		   if ($scope.dirPath != "/"){
			   var dir = {}
			   dir.name = "Parent"
			   var parentPath = $scope.path.slice();
			   parentPath.pop();
			   
			   dir.path = "/pictures/" + parentPath.join("$");
			   $scope.directories.unshift(dir);
		   }		   

		   $scope.slides = [];
		   for (i = 0, len = data.files.length; i < len; i++){ 
		       var file = data.files[i];
			   if (file.type == "img") {
				   var tpath = $scope.path.slice();
				   tpath.push(file.name);
				   var slide = {};
				   var imgPath = tpath.join("/");
				   if (imgPath.charAt(0) != "/") { imgPath = "/" + imgPath;}
				   slide.name = file.name;
				   slide.image = tpath.join("/");
				   $scope.slides.push(slide)
			   }
		   }
		   
		   
		});
		
		$scope.showImage = function(slide){
			$scope.currentSlide = slide;
		}
});
