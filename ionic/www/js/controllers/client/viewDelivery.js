angular.module('starter.controllers')
    .controller('ClientViewDeliveryCtrl', [
        '$scope', '$stateParams', 'ClientOrder', '$ionicLoading',
        function ($scope, $stateParams, ClientOrder, $ionicLoading) {
            $scope.order = {};
            $scope.map = {
                center: {
                    latitude: -23.444,
                    longitude: -46.444
                },
                zoom: 12
            };

            $scope.markers = [
                {
                    id: 1,
                    coords: {
                        latitude: -22.444,
                        longitude: -46.444
                    },
                    options: {
                        title: 'Meu título',
                        labelContent: 'Meu marcador',
                        icon: 'http://maps.google.com/mapfiles/kml/shapes/airports.png'
                    }
                },
                {
                    id: 2,
                    coords: {
                        latitude: -23.444,
                        longitude: -46.444
                    },
                    options: {
                        title: 'Meu título',
                        labelContent: 'Meu marcador'
                    }
                }
            ];

            $scope.order = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });
            // Quando retorna apenas um objeto usar get
            ClientOrder.get({id: $stateParams.id, include: "items,cupom"}, function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
            }, function(dataError){  // funcao de fracasso
                $ionicLoading.hide();
            });
        }]);


