//angular.module('template')
//
//    .service('contactsService', function () {
//
//
//    });



(function() {
  'use strict';

  angular
    .module('template')
    .service('stockService', function () {

      self.stocksListSrv = [];
    	this.addStock = function(symbol){
    		console.log('from service: ',symbol);
        self.stocksListSrv.push(symbol);
    	}

      this.getStockList = function(){
        return self.stocksListSrv;
      }
    });


})()
