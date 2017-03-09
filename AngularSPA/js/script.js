

// this is the module
var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate']);

// configure the routes for the different views
angularApp.config(function($routeProvider) {
    $routeProvider

        // route for home page
        .when('/home', {
            templateUrl : 'views/home.html',
            controller : 'mainController'
        })

        //route for about page
        .when('/about', {
            templateUrl : 'views/about.html',
            controller : 'aboutController'
        })

        //contact page
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller : 'contactController'
        })

        .otherwise({
            redirectTo : '/home'
        });
});

// these are controllers for each page that send models, here as test messages
angularApp.controller('mainController', function($scope) {
    $scope.message = '';

});

angularApp.controller('aboutController', function($scope) {
    $scope.message = 'A passion of mine is photography. Explore some of the shots from my year living abroad in Japan below.';
    // $scope.feature = '';

    $scope.slides = [{
        src: 'img/dylan-walsh-kobe-doggies.jpg',
        description: "Dogs in Kobe"
    }, {
        src: 'img/dylan-walsh-himeji-castle.jpg',
        description: "Himeji Casle"
    }, {
        src: 'img/dylan-walsh-lawn-clippings.jpg',
        description: "A woman cutting grass by hand"
    }, {
        src: 'img/dylan-walsh-bride-to-be.jpg',
        description: "On her wedding day"
    }, {
        src: 'img/dylan-walsh-dolphins.jpg',
        description: "Dolphins from the local aquarium in Hyogo Prefecture"
    }, {
        src: 'img/dylan-walsh-yakuza-cat.jpg',
        description: "A steely cat"
    }];

    $scope.direction = 'left';
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.leftSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.rightSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };

    // $scope.image1 = 'img/dylan-walsh-kobe-doggies.jpg';
    // $scope.image2 = 'img/dylan-walsh-himeji-castle.jpg';
    // $scope.image3 = 'img/dylan-walsh-lawn-clippings.jpg';
    // $scope.image4 = 'img/dylan-walsh-bride-to-be.jpg';
    // // $scope.image5 = 'img/dylan-walsh-dolphins.jpg';
    // $scope.image6 = 'img/dylan-walsh-yakuza-cat.jpg';

})

.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

angularApp.controller('contactController', function($scope) {
    $scope.message = 'Thanks for visiting my demo! Click through to learn more about me.';
});


