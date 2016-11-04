angular.module('starter.controllers')
    .controller('LoginCtrl', ['$scope', '$auth', '$cordovaTouchID', '$cordovaKeychain',
        function ($scope, $auth, $cordovaTouchID, $cordovaKeychain) {

        $scope.user = {
            username: '',
            password: ''
        };

            $scope.isSupportTouchID = false;

        $scope.login = function(){
            $auth.login($scope.user.username, $scope.user.password);
        };

        $scope.loginWithTouchID = function(){
            if($scope.isSupportTouchID){
                $cordovaTouchID.authenticate("Passe o dedo para autenticar").then(function() {
                    var promise = $cordovaKeychain.getForKey('username', 'codedelivery'),
                        username = null;
                    promise
                        .then(function(value){
                            username = value;
                            return $cordovaKeychain.getForKey('password', 'codedelivery');
                        })
                        .then(function(value){
                            $auth.login(username, value);
                        });
                }, function () {
                    // error
                });
            }
        };

        if(ionic.Platform.isWebView() && ionic.Platform.isIOS() && ionic.Platform.isIPad()){
            $cordovaTouchID.checkSupport().then(function () {
              $scope.isSupportTouchID = true;
            });
        };
    }]);
