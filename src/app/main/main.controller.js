(function () {
  'use strict';

  angular
    .module('template')
    .controller('MainController', function (stockService) {
      var self = this;
      self.profileName = '';
      self.profileList = stockService.getProfileList();
      self.isNullProfile = true;
      self.editClicked = false;

      self.addProfileName = function (profileName) {
        if (profileName.trim()==''){
          return;
        }
        self.profileName = profileName;
        self.isNullProfile = false;
        stockService.addProfileName(profileName);
        self.profileName = '';
      }

      self.getProfileList = function () {
        self.profileList = stockService.getProfileList();
        return self.profileList;
      }

      self.deleteProfile = function (index) {
        self.profileList = stockService.getProfileList();
        self.profileList.splice(index, 1);
      }

    });


})()





