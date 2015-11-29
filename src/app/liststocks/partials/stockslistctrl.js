

(function() {
  'use strict';

  angular
    .module('template')
    .controller('stockslistctrl', function (stockService) {
    	var self = this;
      self.name = "something";
      self.net = "";
      self.stocksList = stockService.getStockList();

      self.profileName = stockService.getProfileName();

      self.stocksProfile = stockService.getStockProfile();

      self.profileList = stockService.getProfileList();

     self.profileRadio="";

      self.getRoundedPrice = function(price){
        return stockService.getRoundedPrice(price);
      }

      self.getOverAllNet = function (profileName){
        self.stocksProfile = stockService.getStockProfile();
        self.net = 0.0;
        angular.forEach(self.stocksProfile, function(item){

          if (item.profileName==profileName){
            self.netEach = stockService.getRoundedPrice((item.lastTradedPrice * item.numOfShares) - (item.close * item.numOfShares));
            self.net = parseFloat(self.net)+parseFloat(self.netEach);
          }
          return self.net;
        })
      }

  });


})()
