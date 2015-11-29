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
      self.profileList=[];

    	this.addStock = function(symbol,numOfShares ){
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
        var item = {"name":profileName}
        self.profileList.push(item);
      }

      this.updateProfileName = function(profileName){
        self.profileName=profileName;
        return self.profileName;
      }

      this.getProfileName = function(){
        return self.profileName;
      }

      this.getProfileList = function(){
        return self.profileList;
      }


      this.updateStockProfile = function(profileName, hisData, date, numOfShares, name, lastTradedPrice ){
        self.stocksProfile.push({
          "ticker": hisData.Symbol,
          "Date":date,
          "numOfShares":numOfShares,
          "high":this.getRoundedPrice(hisData.High),
          "low":this.getRoundedPrice(hisData.Low),
          "close":this.getRoundedPrice(hisData.Close),
          "name":name,
          "profileName":profileName,
          "lastTradedPrice":lastTradedPrice
        })

        return self.stocksProfile;
      }

      this.getStockProfile = function(){

        return self.stocksProfile;
      }


      this.getRoundedPrice = function (price){
        return Math.round(price * 100) / 100;
      }

    });



})()
