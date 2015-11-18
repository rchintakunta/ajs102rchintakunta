

(function() {
  'use strict';

  angular
    .module('template')
    .controller('addstocksctrl', function (stockService, $scope, $http) {
    	var self = this;
    	self.tickerSymbol="";
      self.numOfShares = "";
      self.result = {};
      self.tableDataHistorical = [];
      self.displaySymbol="";
      self.stocksProfile = stockService.getStockProfile();

      self.getData = function () {

        var url = "http://query.yahooapis.com/v1/public/yql";
        //var symbol = self.symbol;
        var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + self.tickerSymbol + "')");

        /*
         Build the string to use with with $http get to retrieve JSON data from Yahoo Finance API
         Required format is:
         http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20('aapl')&format=json&diagnostics=true&env=http://datatables.org/alltables.env
         */
        var str1 = url.concat("?q=", data);
        str1 = str1.concat("&format=json&diagnostics=true&env=http://datatables.org/alltables.env");

        $http.get(str1)

          .success(function (data, status, headers, config) {
            //console.log("success data, status="+ JSON.stringify(data) + status);
            if (data.query.results == null) {
              console.log("No Valid Results could be Returned!!")
            }
            else {
              self.result.Name = data.query.results.quote.Name;
              self.result.Exchange = data.query.results.quote.StockExchange;
            }
          })

          .error(function (data, status, headers, config) {
            var err = status + ", " + data;
            self.result = "Request failed: " + err;
          });


      }


        self.addStock = function (symbol, nmShares, date) {
          self.tickerSymbol = symbol;
          stockService.addStock(symbol, nmShares);

          self.getData(symbol);

          var url = "http://query.yahooapis.com/v1/public/yql";
         // var symbol = self.symbol;
          self.startDate=date;
          self.endDate = date;

          var dataHistorical = encodeURIComponent("select * from yahoo.finance.historicaldata where symbol in ('" + symbol+ "') " +
          " and startDate = '" + self.startDate + "' " +
          " and endDate = '" + self.endDate + "'");


          var str2 = url.concat("?q=", dataHistorical);
          str2 = str2.concat("&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=");

          $http.get(str2)
            .success(function (data, status, headers, config) {
              //console.log("success data historical, status=" + JSON.stringify(data) + status);
              if (data.query.results == null) {
                console.log("No Valid Historical Results could be Returned!!")
              }
              else {
                self.tableDataHistorical = data.query.results.quote;
                self.displaySymbol = self.tableDataHistorical.Symbol;
                //console.log(self.tableDataHistorical);
                self.stocksProfile = stockService.updateStockProfile(self.tableDataHistorical, date, nmShares, self.result.Name);
              }
            })

            .error(function (data, status, headers, config) {
              var err = status + ", " + data;
              self.result = "Historical Request failed: " + err;
            });

        }

        self.profileName = stockService.getProfileName();


   });


})()
