(function() {
  'use strict';

  angular
    .module('template')
    .controller('NavigationCtrl', function (UI_ROUTES) {
        var self = this;

        self.homeState = UI_ROUTES.kHomeState.stateName;
        self.listStocksState = UI_ROUTES.kliststocksState.stateName;
        self.stockSearchState = UI_ROUTES.kStockSearchState.stateName;
        self.addStocksState = UI_ROUTES.kAddStocks.stateName;
    });


})();
