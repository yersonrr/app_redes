angular.module('starter.controllers', ['LocalStorageModule'])

.controller('AppCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, 
  $state, $ionicNavBarDelegate, $http, localStorageService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.logupData = {};
  localStorageService.set("fullname", "");
  localStorageService.set("nickname", "");
  localStorageService.set("is_admin", false);
  $scope.is_admin = localStorageService.get("is_admin");
  $scope.loged = false;
  $scope.is_admin = false;
  $scope.message_button = "Logup";

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

  $scope.popUpElement = function(message){
    var alertPopup = $ionicPopup.alert({
     title: 'Error',
     template: message
   });
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $('body').removeClass('modal-open');
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
    $('body').removeClass('modal-open');
    $scope.modalup.hide();
  };

  $scope.logout = function() {
    $state.go('app.welcome');
    $scope.loged = false;
    localStorageService.set("fullname", "");
    localStorageService.set("nickname", "");
    localStorageService.set("is_admin", false); 
    $scope.is_admin = false;
    $scope.message_button = "Logup";
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();

      $http.post(
      'https://polar-gorge-13939.herokuapp.com/api/generallog',
      {
        'action': 0,
        'nickname': $scope.loginData.nickname,
        'password': $scope.loginData.password
      }, 
      {}
        ).then (
            function (response) {
              console.log(response);
              data = response.data;
              if(data.id != -1){
                console.log('IT WORKS');
                if(data.client.type_Client == 1){
                  localStorageService.set("is_admin", true);
                  $scope.is_admin = true; 
                  $scope.message_button = "Save User";
                }
                localStorageService.set("client", data.client);
                $state.go('app.home');
                $scope.loged = true;
              } else {
                $scope.popUpElement(data.response);
              }
            },
            function (response) {
              data = response.data;
              console.log("Error");
              console.log(response);
              $scope.closeLogin();

              $scope.popUpElement(data.response);
            }
        );

      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };

  $scope.doLogup = function() {
    console.log('Doing logup', $scope.logupData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogup();

      $http.post(
      'https://polar-gorge-13939.herokuapp.com/api/generallog',
      {
        'action': 1,
        'name': $scope.logupData.name,
        'last_name': $scope.logupData.last_name,
        'age': $scope.logupData.age,
        'id_number': $scope.logupData.id_number,
        'nickname': $scope.logupData.nickname,
        'password': $scope.logupData.password
      }, 
      {}
        ).then (
            function (response) {
              console.log(response);
              data = response.data;
              if(data.id != -1){
                console.log('IT WORKS');
                $state.go('app.home');
                localStorageService.set("client", data.client);
                $scope.loged = true;
              } else {
                $scope.popUpElement(response.data);                  
              }
            },
            function (response) {
              $scope.closeLogup();
              data = response.data;
              console.log("Error");
              console.log(response);
              $scope.popUpElement(data.response);
            }
        );

      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };
})

.controller('AdminCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, 
  $state, $ionicNavBarDelegate, $http){

  $scope.AdminData = {};
  $scope.logupData = {};
  $scope.message_button = "Save User";
  
  $ionicModal.fromTemplateUrl('templates/logup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalup = modal;
  });

  $scope.popUpElement = function(message){
    var alertPopup = $ionicPopup.alert({
     title: 'Error',
     template: message
   });
  };

  $scope.closeLogup = function(){
    $('body').removeClass('modal-open');
    $scope.modalup.hide();
  }

  $scope.doLogup = function() {
    console.log('Doing logup', $scope.logupData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogup();
      var admin = 0;
      if($scope.logupData.is_admin) admin = 1; 

      $http.post(
      'https://polar-gorge-13939.herokuapp.com/api/generallog',
      {
        'action': 2,
        'name': $scope.logupData.name,
        'last_name': $scope.logupData.last_name,
        'age': $scope.logupData.age,
        'id_number': $scope.logupData.id_number,
        'nickname': $scope.logupData.nickname,
        'password': $scope.logupData.password,
        'type_Client': admin,
      }, 
      {}
        ).then (
            function (response) {
              console.log(response);
              data = response.data;
              $scope.modalup.hide();
              if(data.id != -1){
                console.log('IT WORKS');
                $scope.logupData = {};
              }
            },
            function (response) {
              data = response;
              console.log("Error");
              $scope.popUpElement(data.response);
            }
        );

      $ionicNavBarDelegate.showBackButton(false);
    }, 1000);
  };

  $scope.agregar = function(){
    $scope.modalup.show();
  };

  $scope.closeBuscar = function(){
    $scope.modalup.hide();
  };

  $scope.redirect = function(){
    $state.go('app.users');
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

// Boton de transferir funciona bien, el de cancelar no funciona: no borra los campos de texto
.controller('PagoCtrl', function($scope, $ionicPopup, 
  $state, $ionicNavBarDelegate, $http, localStorageService) {
  
  $scope.pagar = {
    usuario: "",
    monto: ""
  }

  $scope.client = localStorageService.get('client');
  
  var pagoForm = angular.copy($scope.pagar)

  $scope.doTransferencia = function(){
    $http.post(
      'https://polar-gorge-13939.herokuapp.com/api/paidview',
      {
        'nickname_remitente': $scope.client.nickname,
        'nickname_receptor': $scope.pagar.usuario,
        'monto': $scope.pagar.monto,
        'concepto': $scope.pagar.concepto,
      }, 
      {}
        ).then (
            function (response) {
              console.log(response);
              data = response.data;
              $scope.modalup.hide();
              if(data.id != -1){
                $scope.client.points = $scope.client.points - $scope.pagar.monto;
                localStorageService.set('client', $scope.client);
                $scope.pagar = {};
                var alertPopup = $ionicPopup.alert({
                  title: 'Transferencia realizada.'
                });

                alertPopup.then(function(res) {
                  console.log('Se realizo una Transferencia.');
                });
              }
            },
            function (response) {
              data = response;
              console.log("Error");
              $scope.popUpElement(data.response);
            }
        );
  };

  $scope.cancelar = function() {
    $scope.pagar = {};
  };

  $scope.clearFields = function() {
    $scope.calculate = angular.copy(pagoForm);
    $scope.calcForm.$setPristine();
  }
})

.controller('UsersCtrl', function($scope, $ionicModal, $timeout, 
  $state, $ionicNavBarDelegate, $http) {

  $scope.actualizarDatos = function(){
    $http.get('https://polar-gorge-13939.herokuapp.com/api/Clients/')
    .then(
      function (response) {
        console.log(response);
        $scope.clients = response.data;
        $ionicNavBarDelegate.showBackButton(false);
      },
      function (response) {
        console.log("Error");
        console.log(response);
      }
    )
  };

  $scope.actualizarDatos();
})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, 
  $state, $ionicNavBarDelegate, $http, localStorageService) {

    $scope.actualizarDatos = function(){
      $scope.client = localStorageService.get("client");
    };

    $scope.actualizarDatos();
})

.controller('OperationsCtrl', function($scope, $ionicModal, $timeout, 
  $state, $ionicNavBarDelegate, $http, localStorageService) {

  $scope.client = localStorageService.get('client');

  $scope.searchUser = function(element){
    $http.get('https://polar-gorge-13939.herokuapp.com/api/Clients/'+element)
    .then(
      function (response) {
        data = response;
        console.log(data);
        return data.name + ' ' + data.last_name;
      },
      function (response) {
        console.log("Error");
        console.log(response);
      }
    )
  };

  $scope.actualizarDatos = function(){
    $http.get('https://polar-gorge-13939.herokuapp.com/api/Transaction/')
    .then(
      function (response) {
        console.log(response);
        $scope.transactions = response.data;
        for(var i in $scope.transactions){
          if($scope.transactions[i].remitente != $scope.client.nickname && $scope.transactions[i].receptor != $scope.client.nickname)
            $scope.transactions.splice(i,1);
        }
      },
      function (response) {
        console.log("Error");
        console.log(response);
      }
    )
  };

  $scope.actualizarDatos();
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
