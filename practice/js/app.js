(function (){

'use strict';
angular.module('myapp',[]).controller('mycontrol',function ($scope){
    $scope.message= "program";
    $scope.name="";
    $scope.totalvalue=0;
    $scope.digits = function(){
        var totalnamevalue = calculate($scope.name);
        $scope.totalvalue= totalnamevalue;
    };
    function calculate(string){
        var totalstringvalue=0;
        for(var i=0;i<string.length;i++)
        {
            totalstringvalue+=string.charCodeAt(i);
        }
        return totalstringvalue;
    };
});
})();