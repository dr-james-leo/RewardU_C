myModule.service('CreateUserService', ['$http', '$rootScope', function ($http, $rootScope) {
    //Service function for POST new user.
    this.registerUser = function (userobject) {
        debugger;
        var registerData = {
            username: userobject.Email,
            email: userobject.Email,
            password: userobject.Password,
            ConfirmPassword: userobject.ConfirmPassword,
            MobileNumber: userobject.MobileNumber,
            FirstName: userobject.Forename,
            LastName: userobject.Surname,
            Address1: userobject.House,
            Address2: userobject.Locality,
            City: userobject.Town,
            Postcode: userobject.Postcode,
            Gender: userobject.Gender,
            SchemeId: $rootScope.SchemeId,
            AgeRange: userobject.ageRange


        };

        var URL = BaseUrl + "user/Register";
        return $http.post(URL, registerData);
    };
}]);
