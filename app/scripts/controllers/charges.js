'use strict';
 
  // Here we attach this controller to our testApp module
var chargesController = angular.module('chargesController',['chargesService','Constants', 'smart-table']);

chargesController.controller('ChargesCtrl', function ($scope, $rootScope, $location, $timeout, ChargesService, REST_URL, APPLICATION) {
      console.log('ChargesCtrl : loadCharges');
      //To load the loadproducts page
      var promise = null;

      $scope.isLoading = false;
      $scope.rowCollection = [];
      $scope.displayed=[]
      //Success callback
      var chargesSuccess = function(result) {
         $scope.isLoading = false;
         try {
              $scope.rowCollection = result.data;
          } catch (e) {
          }
      }

      //failur callback
      var chargesFail = function(result){
          $scope.isLoading = false;
          console.log('Error : Return from charges service.');
      }

      var loadCharges = function getData(tableState) {
        $scope.isLoading = true;

        $timeout(
          function() {
              $scope.rowCollection = [];
              //service to get clients from server
              //Enter the path or url to get the datas
              ChargesService.getData(REST_URL.CHARGES).then(chargesSuccess, chargesFail);              
          }, 2000
        );
      };

      loadCharges();
});

chargesController.controller('ChargeFormCtrl', function ($scope, $rootScope, $location, $timeout, ChargesService, REST_URL, APPLICATION) {
      console.log('ChargeFormCtrl : Insert Charge');
      $scope.authenticate = function(loginDetails){
    console.log('ChargeFormCtrl : authenticate');
    //reset error value
    $scope.error=false;
    //Validate login form
    if ($scope.chargeForm.$valid) {
      //check for null details
      if(!Utility.isUndefinedOrNull(Charge)){

      }else{
        $scope.invalidateForm();
      }
    } else {
      $scope.invalidateForm();
    }
  };

  //invalidate login form
  $scope.invalidateForm = function(){
   $scope.chargeForm.invalidate = false;
  };

  //Clear error from the login page
  $scope.clearError = function(){
   $scope.chargeForm.invalidate = false;
  };
});