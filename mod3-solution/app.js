(function (){
'use strict';
angular.module('NarrowItDownApp',[]).controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems);

//declaring directive function template

function FoundItems() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'itemloader.html',
        scope: {
            foundItems: '<',
            onEmpty: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'narrowit',
        bindToController: true
    };

    return ddo;
}

//inject service to controller

NarrowItDownController.$inject=['MenuSearchService'];

//controller fuction declaration

function NarrowItDownController(MenuSearchService){
    var narrowit = this;
    narrowit.searchTerm="";
    narrowit.matchMenuItems = function(searchTerm){
    var promise =  MenuSearchService.getItems(searchTerm);
    promise.then(function(items){
        if(items && items.length >0){
            narrowit.message='';
            narrowit.found=items;
        }
        else{
            narrowit.message="Nothing found!";
            narrowit.found=[];
        }
    }).catch(function(error){
        console.log(error.message);
    });
}
    narrowit.removeItem = function(ItemIndex){
        narrowit.found.splice(ItemIndex,1);
    }

}

//injecting $http to service

MenuSearchService.$inject=['$http']

//declaring service function

function MenuSearchService($http){

    var service = this;
    service.getItems = function(searchTerm){
        return $http({
            method:"GET",
            url:"https://davids-restaurant.herokuapp.com/menu_items.json",
        }).then(function(response){
            var foundItems=[];
            for(let i=0;i<response.data['menu_items'].length;i++){
                if(searchTerm.length >0 &&response.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !==-1){
                    foundItems.push(response.data['menu_items'][i]);
                }
            }
            return foundItems;
        });
    };
}



})();