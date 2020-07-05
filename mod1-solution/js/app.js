(function (){
'use strict';
angular.module("myapp",[]).controller("mycontroller",mycontroller);
mycontroller.$inject=['$scope'];
function mycontroller($scope){
  $scope.messages= "";
  $scope.stringarr="";
  $scope.checkstr = function (){
    var arr= $scope.stringarr.split(',');
    var result = arr.filter(arr => arr.trim().length > 0);
    if(result.length === 0)
    {
      $scope.messages="Please enter the data first";
    }
    else{
    if(result.length <=3 )
    {
       $scope.messages = "Enjoy!";
    }
    if(result.length > 3)
    {
       $scope.messages = "Too Much!";
    }
  }
  };
}
})();