angular.module('starter.controllers')
    .controller('TouchIDCtrl', ['$scope','$ionicPopup','UserData', 'OAuth', '$cordovaKeyChain',
        function ($scope, $ionicPopup, UserData, OAuth, $cordovaKeyChain) {

        $scope.user = {
            username: UserData.get().email,
            password: ''
        };

        $scope.login = function(){
            $scope.user.usename = UserData.get().email();
            var promise = OAuth.getAccessToken($scope.user);
            promise
                .then(function () {
                    return $cordovaKeychain.setForKey('username', 'codedelivery', $scope.user.username);
                })
                .then(function(value){
                    return $cordovaKeychain.setForKey('password', 'codedelivery', $scope.user.password);
                })
                .then(function(value){
                    $ionicPopup.alert({
                        title: 'Informação',
                        template: 'TouchID habilitado'
                    });
                }, function () {
                    $ionicPopup.alert({
                        title: 'Advertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });

        };


    }]);
