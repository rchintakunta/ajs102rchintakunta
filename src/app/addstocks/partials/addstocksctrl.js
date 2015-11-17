

(function() {
  'use strict';

  angular
    .module('template')
    .controller('addstocksctrl', function (stockService) {
    	var self = this;
    	self.tickerSymbol="";

        self.addStock = function (symbol) {
          stockService.addStock(symbol);
        }

  });


})()
