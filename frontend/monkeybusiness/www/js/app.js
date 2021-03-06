// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller:'HomeCtrl'
      }
    }
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })

  .state('app.operaciones', {
      url: '/operaciones',
      views: {
        'menuContent': {
          templateUrl: 'templates/operaciones.html',
          controller: 'OperationsCtrl'
        }
      }
    })
    .state('app.pago', {
      url: '/pago',
      views: {
        'menuContent': {
          templateUrl: 'templates/pago.html',
          controller: 'PagoCtrl'
        }
      }
    })
    .state('app.configuracion', {
      url: '/configuracion',
      views: {
        'menuContent': {
          templateUrl: 'templates/configuracion.html',
          controller: 'ConfigCtrl'
        }
      }
    })
    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'templates/admin.html',
          controller: 'AdminCtrl'
        }
      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/buscar.html',
          controller: 'UsersCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');
});
