angular.module('starter.controllers')
    .controller('ClientCheckoutDetailCtrl', [
        '$scope', '$state','$stateParams','$cart',  function($scope, $state, $stateParams, $cart){
            console.log("before");
            $scope.product = $cart.getItem($stateParams.index);
            console.log("after");

            $scope.updateQtd = function() {
                $cart.updateQtd($stateParams.index, $scope.product.qtd);
                $state.go('client.checkout');
            }
    }]);
