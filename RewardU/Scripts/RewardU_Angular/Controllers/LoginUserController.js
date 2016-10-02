//Controller for Login User

myModule.controller('LoginUserController', ['$scope', 'LoginUserService', '$location', 'Notification', '$rootScope', function ($scope, loginUserService, $location, Notification, $rootScope) {
    //Controller Function for Login User
    $scope.loginuserobj = [];
    $scope.loginUser = function () {
        if (!$scope.loginuserobj)
        {
            Notification.error('Please enter username');
            return;
        }
        else if (!$scope.loginuserobj.UserName) {
            Notification.error('Please enter username');
            return;
        }
        else if (!$scope.loginuserobj.PassWord)
        {
            Notification.error('Please enter password');
            return;
        }
        loginUserService.LoginUser($scope.loginuserobj).success(function (data)
        {
            if (!!data && !!data.responseResultTls)
            {
              
                if (data.responseResultTls.error == "401") {
                  
                    Notification.error('Invalid credentials');
                }
                else {
                  
                    $rootScope.accesstoken = data.responseResultTls.access_token;
                    $scope.tokentype = data.responseResultTls.token_type;
                    sessionStorage.setItem('UserName', $scope.loginuserobj.UserName);
                    sessionStorage.setItem('access_token', $rootScope.accesstoken);
                    $rootScope.loggedinUserName = $scope.loginuserobj.UserName;
                    window.location.href = "/Member/Index";
                }
            }
        },
        function (error)
        {
            Notification.error('Invalid credentials');
        });
    };

   


}]);
