angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl', [
        '$scope', '$state', '$ionicLoading', 'UserData',
        function ($scope, $state, $ionicLoading, UserData) {
            $scope.user = UserData.get();

            $scope.isSupportTouchID = false;

            $scope.logout = function(){
                $state.go('logout');
            };

            if(ionic.Platform.isWebView() && ionic.Platform.isIOS() && ionic.Platform.isIPad()){
                $cordovaTouchID.checkSupport().then(function () {
                    $scope.isSupportTouchID = true;
                });
            };

        }]);


