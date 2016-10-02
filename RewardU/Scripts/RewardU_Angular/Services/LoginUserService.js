myModule.service('LoginUserService', ['$http', '$rootScope', function ($http, $rootScope) {
    //Service function for Login user.
    this.LoginUser = function (userobject) {
        
        var loginData = {
            username: userobject.UserName,
            password: userobject.PassWord,
            
        };
        $rootScope.UserName = userobject.username;
        var URL = BaseUrl + "user/Login";
        return $http.post(URL, loginData);
    };
}]);