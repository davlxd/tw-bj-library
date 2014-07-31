'use strict';

/* Controllers */

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
      success(function (data, status, headers, config) {
	$scope.name = data.name;
      }).
      error(function (data, status, headers, config) {
	$scope.name = 'Error!';
      });

  }).
  controller('IndexCtrl', function ($scope, $http) {
    $http.get('/api/books').
      success(function(data, status, headers, config) {
	$scope.books = data.books;
	$scope.books.forEach(function(el, idx, arr){
	  var author_arr = el.author;
	  var author_str = author_arr.reduce(function(prev, cur, idx, arr){
	    return prev + ', ' + cur;
	  });
	  el.author = author_str;
	});
      });
  }).
  controller('AddCtrl', function ($scope, $http, $location) {
    $scope.form = {};
    $scope.dataChanged = function () {
      if ($scope.form.isbn.length === 13) {
	$http.post('/api/isbn', $scope.form).
	  success(function(data) {
	    $scope.book = data;
	    var author_arr = $scope.book.author;
	    $scope.book.author = author_arr.reduce(function(prev, cur, idx, arr){
	      return prev + ', ' + cur;
	    });
	    $scope.form.isbn = '';
	    //$location.url('/');
	  });
      }
    };
    $scope.titleFetched = function () {
      console.log('fuck');
    };
  }).
  controller('DetailCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/book/' + $routeParams.id).
      success(function(data) {
	$scope.book = data.book;
      });
  }).
  controller('EditCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/book/' + $routeParams.id).
      success(function(data) {
	$scope.form = data.book;
      });

    $scope.editBook = function () {
      $http.put('/api/book/' + $routeParams.id, $scope.form).
	success(function(data) {
	  $location.url('/detail/' + $routeParams.id);
	});
    };
  }).
  controller('ModalDemoCtrl', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {
      console.log($scope);
      var modalInstance = $modal.open({
	templateUrl: 'myModalContent.html',
	controller: ModalInstanceCtrl,
	size: size,
	resolve: {
          items: function () {
            return $scope.items;
          }
	}
      });

      modalInstance.result.then(function (selectedItem) {
	$scope.selected = selectedItem;
      }, function () {
	$log.info('Modal dismissed at: ' + new Date());
      });
    };
  }).
  controller('DeleteCtrl', function ($scope, $http, $location, $routeParams) {
    $http.get('/api/book/' + $routeParams.id).
      success(function(data) {
	$scope.book = data.book;
      });

    $scope.deleteBook = function () {
      $http.delete('/api/book/' + $routeParams.id).
	success(function(data) {
	  $location.url('/');
	});
    };

    $scope.home = function () {
      $location.url('/');
    };
  });
