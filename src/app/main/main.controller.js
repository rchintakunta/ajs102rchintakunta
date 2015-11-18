

(function() {
  'use strict';

  angular
    .module('template')
    .controller('MainController', function (stockService) {
    	var self = this;
      self.profileName = '';
      self.isNullProfile = true;
      self.editClicked = false;

      self.addProfileName = function(profileName){
        self.profileName = profileName;
        self.isNullProfile = false;
        stockService.addProfileName(profileName);
      }

      self.editProfileName = function (profileName){
        self.isNullProfile = true;
        self.editClicked = true;
        self.profileName = stockService.updateProfileName(profileName);
      }

      self.deleteProfileName = function(){
        self.isNullProfile = true;
        self.editClicked = false;
        self.profileName = stockService.updateProfileName('');
      }


  });


})()





