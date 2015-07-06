angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ParseService, $state, $ionicLoading) {
  
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

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(username, password) {


    $ionicLoading.show({
      content: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 50,
      showDelay: 0
    })

    $scope.login_username = username;
    $scope.login_password = password;

    console.log('username', $scope.login_username)
    console.log('password', $scope.login_password)

    ParseService.login($scope.login_username, $scope.login_password, function(user) {})
    .then(function(user) {
      $ionicLoading.hide();
      console.log('its back from the service!!!!!!!!!!: ', user)
    })
    .catch(function(err) {
      $ionicLoading.hide();
      console.log('Sorry we couldnt sign you up: ', err);
    })    

    $scope.closeLogin();
    $scope.currentUser = Parse.User.current();
    console.log('current user from controller', $scope.currentUser);    

  };

  $scope.doSignup = function(username, password) {

    $ionicLoading.show({
      content: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 50,
      showDelay: 0
    })

    $scope.signup_username = username;
    $scope.signup_password = password;

    console.log('username', $scope.signup_username)
    console.log('password', $scope.signup_password)

    ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      console.log('current user from controller', user);
    })
    .then(function(user) {
      $ionicLoading.hide();
      console.log('the user is back for signup', user);
    })
    .catch(function(user) {
      $ionicLoading.hide();
      console.log('Sorry we couldnt sign you up: ', user);
    })

    $scope.closeLogin();
    $scope.currentUser = Parse.User.current();
    console.log('current user in do signup controller', $scope.currentUser);
  }

  $scope.logOut = function() {
    ParseService.logout();
    $scope.login();
    $scope.currentUser = {};
    console.log('current user', $scope.currentUser);

  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HomeCtrl', function($scope, $stateParams) {

});


