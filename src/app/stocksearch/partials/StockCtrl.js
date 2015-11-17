

(function() {
  'use strict';

  angular
    .module('template')

    .directive('capitalize', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          var capitalize = function(inputValue) {
            if(inputValue == undefined) inputValue = '';
            var capitalized = inputValue.toUpperCase();
            if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
          }
          modelCtrl.$parsers.push(capitalize);
          capitalize(scope[attrs.ngModel]);  // capitalize initial value
        }
      };
    })

    .controller('StockCtrl', function ($scope, $http) {
      var self = this;
      self.symbol = "";
      self.startDate = "";
      self.endDate = "";
      self.result = {};
      self.tableDataHistorical = [];
      self.Dates=[];
      self.values=[];
      self.scopeUrl=

        self.getData = function () {

          var url = "http://query.yahooapis.com/v1/public/yql";
          var symbol = self.symbol;
          var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + self.symbol + "')");

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
                self.result.MarketCap = "$"+ data.query.results.quote.MarketCapitalization;
                self.result.LastPrice = "$"+ data.query.results.quote.LastTradePriceOnly;
                self.result.PercentChange = data.query.results.quote.PercentChange;
                self.result.YearRange = "$"+ data.query.results.quote.YearRange;
              }
            })

            .error(function (data, status, headers, config) {
              var err = status + ", " + data;
              self.result = "Request failed: " + err;
            });


        }

      self.getHistoricalData = function () {

        self.getData(self.symbol);

        var url = "http://query.yahooapis.com/v1/public/yql";
        var symbol = self.symbol;
        var dataHistorical = encodeURIComponent("select * from yahoo.finance.historicaldata where symbol in ('" + self.symbol + "') " +
        " and startDate = '" + self.startDate + "' " +
        " and endDate = '" + self.endDate + "'");


        var str2 = url.concat("?q=", dataHistorical);
        str2 = str2.concat("&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=");

        //console.log('startDate: ', self.startDate, ' endDate: ', self.endDate);

        $http.get(str2)
          .success(function (data, status, headers, config) {
            //console.log("success data historical, status=" + JSON.stringify(data) + status);
            if (data.query.results == null) {
              console.log("No Valid Historical Results could be Returned!!")
            }
            else {
              self.tableDataHistorical = data.query.results.quote;
              $scope.labels=[];
              $scope.data=[];
              $scope.idata=[];
              angular.forEach(self.tableDataHistorical, function(item){
                $scope.labels.push(item.Date);
                $scope.idata.push(item.Close);
              })
              $scope.labels = $scope.labels.reverse();
              $scope.data.push($scope.idata.reverse());
            }
          })

          .error(function (data, status, headers, config) {
            var err = status + ", " + data;
            self.result = "Historical Request failed: " + err;
          });

        $scope.series = [];
        $scope.series.push(self.symbol.toUpperCase());
        /*$scope.onClick = function (points, evt) {
         console.log(points, evt);
         };*/
      }


      self.clearData = function () {
        self.symbol = "";
        self.result = {};
        self.tableDataHistorical = [];
        self.historicalDisplay = "";
        self.startDate = "";
        self.endDate = "";
        $scope.labels=[];
        $scope.data=[];

      }
    });


})()
