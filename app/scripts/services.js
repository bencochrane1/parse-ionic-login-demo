angular.module('starter.services', [])

.factory('ParseService', function($q) {

    Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);

    var loggedInUser;

    var ParseService = {

        login: function login(username, password, callback) {

            var deferred = $q.defer();

            Parse.User.logIn(username, password, {
                success: function(user) {
                    console.log('user data from service on login: ', user);
                    console.log('we are about to resolve')
                    deferred.resolve(user);
                    loggedInUser = user;
                    callback(user);

                    console.log('current user from the service', user);
                    console.log('You are logged in successfully');
                }, 
                error: function(err) {
                    // console.log('error user', user)
                    console.log('error err', err)
                    deferred.reject(err);
                    // alert("Error", + err.message)
                }
            });

            return deferred.promise;
        },

        signUp: function signUp(username, password, callback) {

            var deferred = $q.defer();

            Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
                success: function(user) {
                    deferred.resolve(user);
                    loggedInUser = user;
                    callback(user);
                    console.log('new user from the service', user);
                },
                error: function(user, err) {
                    console.log('error user', user)
                    console.log('error err', err.message)
                    deferred.reject(user);
                }
            });

            return deferred.promise;
            // this.signupError = {}
        },

        logout: function logout(callback) {
            console.log('you have been logged out');
            Parse.User.logOut();

        }
    }
    return ParseService;
});

