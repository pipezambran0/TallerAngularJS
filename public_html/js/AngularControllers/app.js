/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var aplicacionMundial = angular.module('aplicacionMundial', []);

aplicacionMundial.directive('toolbar', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/toolbar.html',
        controller: function () {
            this.tab = 0;
            this.selectTab = function (setTab) {
                this.tab = setTab;
            };
            this.isSelected = function (tabParam) {
                return this.tab === tabParam;
            };
        },
        controllerAs: 'toolbar'
    };
});

aplicacionMundial.directive('competitorInfo', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/competitor-info.html',
        controller: 'getCompetitors'
    };
});

aplicacionMundial.controller("getCompetitors", function ($http, $scope) {
    $http.get('http://localhost:8088/competitors/get')
            .success(function (data, status, headers, config) {
                $scope.competitors = data;
            })
            .error(function (data, status, headers, config) {
                // log error
                console.error("Error fetching competitors data:", status, data);
            });
});

aplicacionMundial.directive('competitorForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/competitor-form.html',
        controller: 'competitorCtrl'
    };
});

aplicacionMundial.controller("competitorCtrl", function ($http, $scope) {
    $scope.addCompetitor = function () {
        console.log('name');
        $http.post(
                'http://localhost:8088/competitors/add',
                JSON.stringify($scope.competitor)
                )
                .success(function (data, headers) {
                    $scope.competitor = {};
                    $scope.toolbar.selectTab(2);
                })
                .error(function (data, status, headers, config) {
                    console.error("Error adding competitor:", status, data);
                });
    };
});

aplicacionMundial.directive('loginForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/login-form.html',
        controller: 'loginCtrl'
    };
});

aplicacionMundial.controller("loginCtrl", function ($http, $scope, $window) {

    $scope.login = function () {
        var loginUrl = 'http://localhost:8088/competitors/login/' + $scope.credentials.address + '/' + $scope.credentials.password;

        $http.post(loginUrl)
        .then(function (response) {
            $scope.loginSuccessful = true;
            $scope.loginFailed = false;
        })
        .catch(function (error) {
            $scope.loginSuccessful = false;
            $scope.loginFailed = true;
        });
    };
});
