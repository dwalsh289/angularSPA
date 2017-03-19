

// this is the module
var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate', 'ui.directives', 'ngSanitize', 'angularApp.services']);

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

        .when('/twitter', {
            templateUrl : 'views/twitter.html',
            controller : 'twitterController'
        })

        .otherwise({
            redirectTo : '/home'
        });
});

// these are controllers for each page that send models, here as test messages
angularApp.controller('mainController', function($scope) {
    $scope.message = '';

});

angularApp.controller('twitterController', function($scope) {
    $scope.message = 'Get you twitter fix here!';
});

angularApp.controller('aboutController', function($scope) {
    // $scope.message = 'A passion of mine is photography. Explore some of the shots from my year living abroad in Japan below.';

    $scope.setMessage = function(input) {
        return $scope.currentIndex === 5 ? $scope.message = 'Thanks for looking at my photography!' :     $scope.message = 'A passion of mine is photography. Explore some of the shots from my year living abroad in Japan below.';
    };

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
        description: "A steely cat",
    }];

    $scope.direction = 'left';
    $scope.currentIndex = 1;



    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
        console.log($scope.currentIndex);
    };


    $scope.leftSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        console.log($scope.currentIndex);
    };

    $scope.rightSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        console.log($scope.currentIndex);
    };



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

function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}

angular.module('ui.filters', []);
angular.module('ui.directives', []);
angular.module('ui', [
    'ui.filters',
    'ui.directives'
]).value('ui.config', {});

angular.module('ui.directives', []).directive('googleMap', function () {
    return {
        template: '<iframe width="100%" height="350" frameborder="0" style="border:0"></iframe>',
        restrict: 'E',
        scope: {
            pbcode: '='
        },
        link: function postLink(scope, element) {
            var mapFrame = element.find("iframe");
            if (scope.pbcode) {
                mapFrame.attr('src', "https://www.google.com/maps/embed?pb=" + scope.pbcode);
            }
            else {
                mapFrame.attr('src', '');
            }
        }
    };
});


