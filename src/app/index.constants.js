/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('template')
    .constant('malarkey', malarkey)
    .constant('moment', moment)

    .constant('UI_ROUTES', {
    	kHomeState: {
    		stateName: 'home'
    	},
    	kliststocksState: {
    		stateName: 'liststocks'
    	},
    	kStockSearchState: {
    		stateName: 'stocksearch'
    	},
    	kAddStocks: {
    		stateName: 'addstocks'
    	}
    });

})();
