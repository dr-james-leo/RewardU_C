myModule.service('IndexPageServices', ['$http', '$rootScope', function ($http, $rootScope) {
    //Service function for Login user.
    this.getAccount = function ()
    {
        
        // var URL = TlsUrl + "merchant/getAccountDetails?username=" + $rootScope.loggedinUserName;
        var URL = TlsUrl + "merchant/getAccountDetails?username=" + sessionStorage.getItem('UserName');
        return $http.get(URL);
    };

    this.getAwtransaction = function () {
   
        var URL = TlsUrl + "merchant/getAWTransaction?username=" + sessionStorage.getItem('UserName');
        return $http.get(URL);
    };
    this.getBanners = function () {
      
        var URL = TlsUrl + "merchant/getBanners";
        return $http.get(URL);
    };
    this.getRetailerList = function () {
     
        var URL = TlsUrl + "merchant/MerchantDetails";
        return $http.get(URL);
    };
    //For get all the Category for the specific catalogId
    this.getCategories = function () {
        var URL = categoryBaseUrl + "GetCategories?catalogId=" + CatalogId;
        return $http.post(URL)
    };

    //For get all the subCategory for the specific categoryId
    this.getSubCategories = function (CategoryId) {
        var URL = categoryBaseUrl + "GetSubCategoriesAndItems?catalogId=" + CatalogId + "&categoryId=" + CategoryId;
        return $http.post(URL)
    };

    //for get all the Products from the Specific Category or SubCategory
    this.getProducts = function (subCategoryId) {
        var URL = categoryBaseUrl + "GetCommonProperties?catalogId=" + CatalogId + "&subCategoryId=" + subCategoryId;
        return $http.post(URL)
    };

    //Add one Item into the Cart
    this.AddToCart = function (ProductId, UserName) {
        var cartItemData =
             {
                 productId: ProductId,
                 userName: UserName,
                 quantity: '1',
             };
        //var url3 = baseUrl3 + "AddItemsToCart?productId=" + ProductId;
        var URL = cartBaseUrl + 'AddItemsToCart';
        return $http.post(URL, cartItemData);
    };

    //For get all the Items From the Cart
    this.getCart = function () {
        var userName = sessionStorage.getItem('UserName');
        var URL = cartBaseUrl + "GetCart?userName=" + userName;
        return $http.get(URL);
    };

    //For Remove one Item from the Cart
    this.removeCart = function (LineItemId, UserName) {
        var URL = cartBaseUrl + "RemoveItemsFromCart?cartLineItemId=" + LineItemId + "&userName=" + UserName;
        return $http.delete(URL);
    };

    //For Updateing one particular Item quantity from the Cart
    this.updateCart = function (LineItemId, Quantity) {
        var cartItemData =
             {
                 cartLineItemId: LineItemId,
                 userName: sessionStorage.getItem('UserName'),
                 quantity: Quantity,
             };
        var URL = cartBaseUrl + "UpdateItemsInCart";
        return $http.post(URL, cartItemData);
    };

    //For Get the ConfirmBalance From the Transaction
    this.GetAvailableBalance = function (UserName) {
        var URL = AccountBaseUrl + "GetAvailableBalanceToSpend?Email=" + UserName;
        return $http.get(URL);
    };

    //For the Create the Order 
    this.CheckOut = function (userName, Point) {
        var URL = cartBaseUrl + "Checkout?userName=" + userName + "&point=" + Point;
        return $http.post(URL);
    };
    //For get all orders list
    this.getOrderList = function () {
      
        var postData = {
            UserName: sessionStorage.getItem('UserName')
        }
        var URL = BaseUrl + "cart/GetOrders";
        return $http.post(URL, postData);
    };

    this.getmemberDetails = function () {
        
        $http.defaults.headers.common['Authorization'] = "Bearer" + " " + sessionStorage.getItem('access_token');
        return $http({
            method: "GET",
            url: TlsUrl + "TLSMobileAuthentication/GetUserDetails?emailId=" + sessionStorage.getItem('UserName'),
            dataType: JSON
        });
    };
    this.updateMemberDetails = function (userObject) {
        var userData = {
            UserName: userObject.userName,
            Address1: userObject.address1,
            Address2: userObject.address2,
            PostCode: userObject.postCode,
            City: userObject.city,
            Country: userObject.country,
            FirstName: userObject.firstName,
            LastName: userObject.lastName,
            //MobileNumber:userObject.mobileNumber,
            Gender: userObject.gender,
            AgeRange: userObject.ageRange,
            Title: userObject.Title,
        };

        var URL = BaseUrl + "user/UpdateUserDetails"
        return $http.post(URL, userData);
    };
    this.updatePassword = function (userData) {
        var data = {
            UserName: userData.userName,
            newPassword: userData.Password,
            Email: userData.userName,
            Password: userData.ConfirmPassword,
        };
        var URL = BaseUrl + "user/UpdatePassword"
        return $http.post(URL, data);
    };
    this.getAllTransaction = function () {
        debugger;
        var URL = TlsUrl + "Merchant/getAllTransaction?userName=" + sessionStorage.getItem('UserName');

        return $http.get(URL)

    };
}]);