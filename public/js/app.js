'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.bootstrap'
]).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
	templateUrl: 'partials/index',
	controller: 'IndexCtrl'
      }).
      when('/add', {
	templateUrl: 'partials/add',
	controller: 'AddCtrl'
      }).
      when('/detail/:id', {
	templateUrl: 'partials/detail',
	controller: 'DetailCtrl'
      }).
      when('/edit/:id', {
	templateUrl: 'partials/edit',
	controller: 'EditCtrl'
      }).
      when('/delete/:id', {
	templateUrl: 'partials/delete',
	controller: 'DeleteCtrl'
	// }).
	// otherwise({
	//   redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
