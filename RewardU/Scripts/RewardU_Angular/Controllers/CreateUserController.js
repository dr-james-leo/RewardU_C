//Controller for Create new user
myModule.controller('CreateUserController', ['$scope', 'CreateUserService', 'Notification', '$rootScope', function ($scope, createUserService, Notification, $rootScope) {
    //Controller Function for create new User
    $scope.registeruserobj = [];
    $scope.createUser = function () {
        debugger;
        if (!$scope.registeruserobj) {
            Notification.error('Please enter username');
            return;
        }
        else if (!$scope.registeruserobj.Email) {
            Notification.error('Please enter username');
            return;
        }
        else if (!$scope.registeruserobj.Password) {
            Notification.error('Please enter password');
            return;
        }
        else if (!$scope.registeruserobj.ConfirmPassword) {
            Notification.error('Please enter ConfirmPassword');
            return;
        } 

        createUserService.registerUser($scope.registeruserobj).success(function (data) {
            Notification.success("Registered Sucessfully");
            $rootScope.accesstoken = data.loginTlsResponsetoken.access_token;
            sessionStorage.setItem('UserName', $scope.registeruserobj.Email);
            sessionStorage.setItem('access_token', $rootScope.accesstoken);
            window.location.href = "/Member/Index";
        }, function (error) {
        });
    };
}]);
