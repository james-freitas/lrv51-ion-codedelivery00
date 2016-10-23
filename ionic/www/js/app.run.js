angular.module('starter.run').run(['PermissionStore', 'RoleStore', 'OAuth', 'UserData', function(PermissionStore, RoleStore, OAuth, UserData){
    PermissionStore.definePermission('user-permission', function(){
        return OAuth.isAuthenticated();
    });
    /*
    * Permissões de client
     */
    PermissionStore.definePermission('client-permission', function(){
        var user = UserData.get();
        if(user == null || !user.hasOwnProperty('role')){
            return false;
        }
        return user.role == 'client';
    });
    RoleStore.defineRole('client-role', ['user-permission', 'client-permission']);
    /*
     * Permissões de deliveryman
     */
    PermissionStore.definePermission('deliveryman-permission', function(){
        var user = UserData.get();
        if(user == null || !user.hasOwnProperty('role')){
            return false;
        }
        return user.role == 'deliveryman';
    });
    RoleStore.defineRole('deliveryman-role', ['user-permission', 'deliveryman-permission']);

}]);