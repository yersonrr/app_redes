angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicNavBarDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/logup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalup = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logup = function() {
    $scope.modalup.show();
  };  

  $scope.closeLogup = function() {
    $scope.modalup.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
      $state.go('app.home');
      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };

  $scope.doLogup = function() {
    console.log('Doing logup', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogup();
      $state.go('app.home');
      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };
})

.controller('AdminCtrl', function($scope, $ionicModal, $timeout, $state, $ionicNavBarDelegate){

  $scope.AdminData = {};
  
  $ionicModal.fromTemplateUrl('templates/logup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalup = modal;
  });

  $ionicModal.fromTemplateUrl('templates/buscar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.search = modal;
  });

  $scope.agregar = function(){
    $scope.modalup.show();
  };

  $scope.modificar = function(){
    $scope.search.show();
  };

  $scope.eliminar = function(){
    $scope.search.show();
  };

  $scope.doBusqueda = function(){
    console.log('Doing busqueda');

    $timeout(function() {
      $scope.closeBuscar();
      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };

  $scope.closeBuscar = function(){
    $scope.modalup.hide();
  };
})

.controller('ConfigCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PagoCtrl', function($scope) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
