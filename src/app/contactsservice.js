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
      self.profileName = '';
      self.stocksProfile=[];

    	this.addStock = function(symbol,numOfShares ){
    		console.log('from service: ',symbol);
        self.stocksListSrv.push({
          "ticker": symbol,
          "numShares": numOfShares
        })

    	}

      this.getStockList = function(){
        return self.stocksListSrv;
      }

      this.addProfileName = function(profileName){
        self.profileName=profileName;
        console.log(self.profileName);
      }

      this.updateProfileName = function(profileName){
        self.profileName=profileName;
        return self.profileName;
      }

      this.getProfileName = function(){
        return self.profileName;
      }


      this.updateStockProfile = function(hisData, date, numOfShares, name ){
        console.log(numOfShares);
        self.stocksProfile.push({
          "ticker": hisData.Symbol,
          "Date":date,
          "numOfShares":numOfShares,
          "high":hisData.High,
          "low":hisData.Low,
          "close":hisData.Close,
          "name":name
        })

        return self.stocksProfile;
      }

      this.getStockProfile = function(){

        return self.stocksProfile;
      }


    });



})()
