var app = angular.module('myApp', ["ngRoute"]);


app.controller('myCtrl', function ($scope, $http, $location) {
    $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
    $http.get('data.json')
        .then((response) => {
            $scope.products = response.data.products
        })
        .catch((err)=> {
            console.log(err)
        });
    $scope.submitSearch = function (search) {
        
        $scope.productsSearch = $scope.products.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
        console.log($scope.productsSearch);
        $scope.result = search;
        $location.path('/result');
    }
});


app.controller('detailsController', function ($scope, $http, $location, $routeParams) {
    $scope.uri = $routeParams.id;

    $http.get('data.json')
        .then((response) => {
            $scope.datas = response.data.products
        })
        .catch((err) => {
            console.log(err)
        })


    $scope.qty = 1;

    $scope.minus = function () {
        if ($scope.qty <= 1) {
            $scope.qty = 1;
        } else {
            $scope.qty--;
        }
    }
    $scope.plus = function () {
        $scope.qty++
    }
    $scope.spinnerText = function () {
        return $scope.qty;
    }
    // cart
    $scope.addToCart = function (item, qty) {
        $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
        $scope.data = {
            cart: { item, qty }
        }
        $scope.carts.push($scope.data)
        localStorage.setItem("cart", JSON.stringify($scope.carts))
        console.log($scope.carts)
    }
})

// // get data from local storage
app.controller('cartCtrl', function ($scope) {
    $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log($scope.carts);

    $scope.handleAction = function (id) {
        $scope.find = $scope.carts.findIndex(item => item.cart.item.id === id)
        $scope.carts.splice($scope.find, 1)
        localStorage.setItem("cart", JSON.stringify($scope.carts))
        console.log($scope.find);
    }
})


app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "views/home.html"
            })
            .when('/about', {
                templateUrl: "views/about.html"
            })
            .when('/service', {
                templateUrl: "views/service.html"
            })
            .when('/pricing', {
                templateUrl: "views/pricing.html"
            })
            .when('/shop', {
                templateUrl: "views/shop.html"
            })
            .when('/contact', {
                templateUrl: "views/contact.html"
            })
            .when('/result', {
                templateUrl: "views/result.html"
            })
            .when('/details/:id', {
                templateUrl: "views/details.html"
            })
            .when('/cart', {
                templateUrl: "views/cart.html"
            })
            .when('/login', {
                templateUrl: "views/login.html"
            })
            .when('/register', {
                templateUrl: "views/register.html"
            })
    }
])
