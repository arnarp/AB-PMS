(function () {
    'use strict';

    angular
        .module('pmsApp')
        .controller('NavbarLogin', NavbarLogin);

    NavbarLogin.$inject = ['$http', '$location', 'notifier', 'identity', 'auth'];

    /* @ngInject */
    function NavbarLogin($http, $location, notifier, identity, auth)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.username = "";
        vm.password = "";
        vm.signin = signin;
        vm.signout = signout;
        vm.identity = identity;

        activate();

        ////////////////

        function activate() {
        }

        function signin(username, password) {
            auth.authenticate(username, password)
                .then(function(success) {
                    if(success) {
                        notifier.success('You have successfully signed in!');
                    } else {
                        notifier.error('Username/Password combination incorrect');
                    }
                });
        }

        function signout() {
            auth.logout().then(function(){
                vm.username = "";
                vm.password = "";
                notifier.success('You have successfully logged out!');
                $location.path('/');
            })
        }
    }
})();