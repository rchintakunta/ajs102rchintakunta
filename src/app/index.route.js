(function() {
  'use strict';

  angular
    .module('template')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, UI_ROUTES) {

    $stateProvider
      .state(UI_ROUTES.kHomeState.stateName, {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController as ctrl'
      })
      .state(UI_ROUTES.kliststocksState.stateName, {
        url: '/liststocks',
        templateUrl: 'app/liststocks/partials/liststocks.html',
        controller: 'stockslistctrl as slistctrl'
      })
      .state(UI_ROUTES.kStockSearchState.stateName, {
        url: '/stocksearch',
        templateUrl: 'app/stocksearch/partials/stocksearch.html',
        controller: 'StockCtrl as sctrl'

      })
      .state(UI_ROUTES.kAddStocks.stateName, {
        url: '/addstocks',
        templateUrl: 'app/addstocks/partials/addstocks.html',
        controller: 'addstocksctrl as acctrl'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
