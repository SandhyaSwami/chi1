//Define an angular module for our App
var location_macro = angular.module('location_macro', ['ngRoute','ngSanitize','angularSpinner','dashboard.chartjs2.0','bc.Flickity','modal']);


location_macro.config(function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/digital_dashboard', {
            templateUrl: 'view/mixed/dashboard.html',
            controller: 'slaDashboardCtrl',
            config:new Client()
        })
        .when('/digital_dashboard_main', {
            templateUrl: 'view/mixed/dashboard_main.html',
            controller: 'slaDashboardCtrl',
            config:new Client()
        })
        .when('/approver', {
            templateUrl: 'view/mixed/approver.html',
            controller: 'approverDashboardCtrl',
            config:new Client()
        })

    ;})
