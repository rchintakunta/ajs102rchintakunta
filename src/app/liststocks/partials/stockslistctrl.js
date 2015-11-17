

(function() {
  'use strict';

  angular
    .module('template')
    .controller('stockslistctrl', function (stockService) {
    	var self = this;
      self.name = "something";
      self.stocksList = stockService.getStockList();
      console.log('from stocks list', self.stocksList);
  });


})()
