//For fetching Retailers from Merchant table
myModule.controller('IndexApiController', ['$scope', 'IndexPageServices', '$rootScope','Notification', function ($scope, IndexPageServices, $rootScope,Notification) {
    getAccountDetails();
    function getAccountDetails() {
        $rootScope.schemeDetails = [];
        IndexPageServices.getAccount().then(function (d) {
            $scope.accountdetails = d.data;
            $rootScope.schemeDetails.imagePath = $rootScope.tlsUrl + $scope.accountdetails.ImagePath;
            $rootScope.schemeDetails.SchemeName = $scope.accountdetails.SchemeName;
        }, function (error) {
        });
    };

    $scope.getAwTransactionDetails = function () {
        IndexPageServices.getAwtransaction().then(function (d) {
            $scope.awtransaction = d.data;
        }, function (error) {
        });
    };
    $scope.getBannersDetails = function () {
        IndexPageServices.getBanners().then(function (d) {
            $scope.myInterval = 1000;
            $scope.banners = d.data;
        }, function (error) {
        });
    };
    
    $scope.getRetailers = function () {
        IndexPageServices.getmemberDetails().success(function (d) {
            var userDetail = d[0];
            IndexPageServices.getRetailerList().then(function (d) {
                for (var j = 0; j < d.data.length; j++) {
                    for (var i = 0; i < d.data[j].Retailors.length; i++) {
                        d.data[j].Retailors[i].ImagePath = $rootScope.tlsUrl + d.data[j].Retailors[i].ImagePath;
                        d.data[j].Retailors[i].RedirectionUrl = d.data[j].Retailors[i].RedirectionUrl + "&awcr=" + userDetail.userId;
                    }
                }
                $scope.retailers = d.data;
            }, function (error) {
            });
        },
        function (error) {
        });        
    };
    $scope.getOrdertotalList = function () {
        IndexPageServices.getOrderList().then(function (d) {
            $scope.orders = d.data;
        }, function (error) {
        });
    };
    $scope.getMember = function () {
  
        IndexPageServices.getmemberDetails().success(function (d) {
        
            $scope.data = d.data;
        }, function (error) { });
    };
    $scope.checkout = function () {
    
        sessionStorage.removeItem('UserName');
        sessionStorage.removeItem('access_token');
        window.location.href = "/Member/Login";

    };


}]);

myModule.controller('ShopApiController', ['$scope', 'IndexPageServices', '$rootScope', function ($scope, IndexPageServices, $rootScope) {
   $scope.getCategoriesAll = function() {
        var servCall = IndexPageServices.getCategories();
        servCall.then(function (d) {
            $scope.categories = d.data.listEntries;
        }, function (error) {
            //$log.error('Oops! Something went wrong while fetching the data.')
        })
    }
   $scope.getSubCategories = function (CategoryId) {
       $("#loadMessage").hide();
        var servCallSubCategory = IndexPageServices.getSubCategories(CategoryId);
        servCallSubCategory.then(function (d) {
            $scope.subcategories = [];
            angular.forEach(d.data.listEntries, function (item) {

                if (item.type == 'category') {
                    $scope.subcategories.push(item);
                }
                else if (item.type == 'product') {
                    var servCallProducts = IndexPageServices.getProducts(CategoryId);
                    servCallProducts.then(function (d) {
                        $scope.Products = d.data.ProductProperties;
                    }, function (error) {
                        //$log.error('Oops! Something went wrong while fetching the data.')
                    })
                }
            });

        }, function (error) {
            //$log.error('Oops! Something went wrong while fetching the data.')
        })
    }
    $scope.getProducts = function (subCategoryId) {
        var servCallProduct = IndexPageServices.getProducts(subCategoryId);
        servCallProduct.then(function (d) {
            $scope.Products = d.data.ProductProperties;
        }, function (error) {
            //$log.error('Oops! Something went wrong while fetching the data.')
        })
    }
    $scope.AddToCart = function (ProductId) {
        var servCallGetCaet = null;
        var userName = sessionStorage.getItem('UserName');
        var servCallAddToCart = IndexPageServices.AddToCart(ProductId, userName);
        servCallAddToCart.then(function (d) {
            servCallGetCart = IndexPageServices.getCart();
            servCallGetCart.then(function (d) {
                var totalItems = 0
                $scope.Carts = d.data.GetCartResponseModels;
                //For Counting the Number of Items in the Cart and total Amount of all the item
                for (var i = 0; i < d.data.GetCartResponseModels.length; i++) {
                    var product = $scope.Carts[i];
                    totalItems += parseInt(product.quantity);
                }
                $rootScope.NoOfItems = totalItems;
                alert("Item Added successfully");
            }, function (error) {

            })
        }, function (error) {

        })
    }
    $scope.stopParentClick = function ($event) {
        $event.stopPropagation();
        return true;
    };
}]);

//For Basket Page all Operation 
myModule.controller('CartApiController', ['$scope', 'IndexPageServices', '$rootScope', function ($scope, IndexPageServices, $rootScope) {
    getTotalCarts();
    function getTotalCarts() {
        var servCallGetCart = IndexPageServices.getCart();
        servCallGetCart.then(function (d) {
            $scope.Carts = d.data.GetCartResponseModels;
            //$rootScope.NoOfItems = d.data.length;
            //$scope.quantity = '2';
            var total = 0;
            var totalItems = 0
            //For Counting the Number of Items in the Cart and total Amount of all the item
            for (var i = 0; i < d.data.GetCartResponseModels.length; i++) {
                var product = $scope.Carts[i];
                total += (product.listPrice * product.quantity);
                totalItems += parseInt(product.quantity);
            }
            $rootScope.TotalAmount = total;
            $rootScope.NoOfItems = totalItems;

        }, function (error) {
        })
    }
    $scope.RemoveFromCart = function (cartLineItemId) {
        var servRemoveCart = IndexPageServices.removeCart(cartLineItemId,   sessionStorage.getItem('UserName'));
        servRemoveCart.then(function (d) {
            getTotalCarts();
            alert("Item Removed Succefully")
        }, function (error) {

        })
    }
    $scope.UpdateFromCart = function (cartLineItemId, quantity,minQuantity,maxQuantity) {
        if (quantity <= maxQuantity) {
            var servUpdateCart = IndexPageServices.updateCart(cartLineItemId, quantity);
            servUpdateCart.then(function (d) {
                getTotalCarts();
                alert("Item Updated Succefully")
            }, function (error) {

            })
        }
        else {
            alert("Sorry!! Cann't update the quntity to"+" "+quantity+" "+"as maximum is"+" "+maxQuantity + " " + "for this Product");
            getTotalCarts();
        }
    }
    $scope.CheckSufficentBalance = function () {
        if (parseInt($rootScope.balanceToSpend) < parseInt($rootScope.TotalAmount))
        {
            alert("You have insufficient points to CHECKOUT. Please remove one or more items from your basket");
            return false;
        }
        else if (parseInt($rootScope.TotalAmount)==0)
        {
            alert("Please Add Some Product into Basket");
            return false;
        }
        else
        {
            window.location.href = "/Member/CheckOut";
        }

    }
    $scope.UpdateBasketAmount = function (Quantity, ProductPrice) {
        var total = total + Quantity * ProductPrice;
        $scope.TotalPrice = total;
    }
    $scope.AddToBuy = function () {
        var servRemoveCart;
        var userName = sessionStorage.getItem('UserName');
        var point = $("#totalAmount").text();
        if (parseInt($rootScope.balanceToSpend) >= parseInt(point)) {
            var servCallToCrateOrder = IndexPageServices.CheckOut(userName, point);
            servCallToCrateOrder.then(function (d) {
                $rootScope.balanceToSpend = d.data.tlsPoint;
                window.location.href = "/Member/Index";
            }, function (error) {

            })
        }
        else {
            alert("You Balace shouldn't be sufficient to buy the product");
        }

    }
}]);

//For Fetching the Balance from the Account table
myModule.controller('AccountApiController', ['$scope', 'IndexPageServices', '$rootScope', function ($scope, IndexPageServices, $rootScope) {
    GetBalance();
    function GetBalance() {
        var userName = sessionStorage.getItem('UserName');
        var servGetBalance = IndexPageServices.GetAvailableBalance(userName);
        servGetBalance.then(function (d) {
            if (d.data != "") {
                $rootScope.balanceToSpend = d.data;
            }
            else {
                $rootScope.balanceToSpend = 0;
            }

        }, function (error) {
        })
    }
}]);
//For Updatemember
myModule.controller('UpdateMemberController', ['$scope', 'IndexPageServices', '$rootScope','Notification', function ($scope, IndexPageServices, $rootScope,Notification) {
    $scope.getUserAddressDetails = function () {
        IndexPageServices.getmemberDetails().success(function (d) {          
            $scope.usersAddress = d[0];
        }, function (error) { });
    };
    $scope.UpdateAddressDetails = function () {
        if (!!$scope.usersAddress.Password) {
            if ($scope.usersAddress.Password == $scope.usersAddress.ConfirmPassword) {
                IndexPageServices.updateMemberDetails($scope.usersAddress).success(function (d) {

                    IndexPageServices.updatePassword($scope.usersAddress).success(function (data) {

                    }, function (error) { });
                });
            }
            else {

                alert("Password Mismatch!!!!!");
                return false;
            }
        }
        else {
            IndexPageServices.updateMemberDetails($scope.usersAddress).success(function (d) {
            }, function (error) { });
        }
        Notification.success("Successfully Updated.");
    };
    $scope.UpdateUserAddressDetails = function () {
        if (!$scope.usersAddress.Title) {
            Notification.error('Please enter Title');
            return;
        }
        else if (!$scope.usersAddress.lastName) {
            Notification.error('Please enter Surname');
            return;
        }
        else if (!$scope.usersAddress.address1) {
            Notification.error('Please enter House,Street');
            return;
        }
        else if (!$scope.usersAddress.city) {
            Notification.error('Please enter Town,County');
            return;
        }
        else if (!$scope.usersAddress.postCode) {
            Notification.error('Please enter postCode');
            return;
        }

        IndexPageServices.updateMemberDetails($scope.usersAddress).success(function (d) {
            alert("Successfully Updated");
        }, function (error) {

        });
    };
}]);
    myModule.controller('TransactionMoreController', ['$scope', 'IndexPageServices', '$rootScope', 'Notification', function ($scope, IndexPageServices, $rootScope, Notification) {
        $scope.getMoretransactionDetails = function () {

            IndexPageServices.getAllTransaction().success(function (d) {
              
                $scope.alltransaction = d;
                console.log(d);
                console.log($scope.alltransaction);
            }, function (error) {
                alert(error);
            });

        }
    }]);

