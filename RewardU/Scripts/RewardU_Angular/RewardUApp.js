//Angular Module
var myModule = angular.module('RewardUApp', ['ui-notification', 'ui.bootstrap', 'ngLoadingSpinner', 'angularSpinner']);

   
//Settings base Urls
var BaseUrl = "http://fsapi.tes.media/api/";
var categoryBaseUrl = BaseUrl + "Search/";
var cartBaseUrl = BaseUrl + 'cart/';
var AccountBaseUrl = BaseUrl+'points/';
var TLSBaseUrl = "http://tls-test.tes.media";
var TlsUrl = TLSBaseUrl + "/api/";
var CatalogId = 'c849447794f04b9caab4cb69e863b7e8';
var URL = '';

/*Declare global variables*/
myModule.run(function ($rootScope) {
    $rootScope.loggedinUserName = "";
    $rootScope.TotalAmount = "";
    $rootScope.SchemeId = 123;
    $rootScope.tlsUrl = TLSBaseUrl;
});
myModule.config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 4000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
});

//myModule.config(function ($routeProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl: "login.html",
//        controller:"MemberController"
//    })
//    .when("/london", {
//        templateUrl: "london.htm"
//    })
//    .when("/paris", {
//        templateUrl: "paris.htm"
//    });
//});