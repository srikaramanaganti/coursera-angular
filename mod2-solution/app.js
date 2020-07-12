(function(){
    'use strict';
    angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",ToBuyController)
    .controller("AlreadyBoughtController",AlreadyBoughtController).service("ShoppingListService",ShoppingListService);

    //inject service to controller

    ToBuyController.$inject =['ShoppingListService'];

    function ToBuyController(ShoppingListService)
    {
        var tobuy = this;
        // tobuy.name=ShoppingListService.name;
        tobuy.buyitem = function(index){ShoppingListService.removeandpush(index);}
        tobuy.getItems= function(){
            try{ 
            return ShoppingListService.getItems();
            }
            catch(error)
            {
            tobuy.ErrorMessage=error.message;
            }
        }
    }

    //inject service to second controller

    AlreadyBoughtController.$inject= ['ShoppingListService'];

    function AlreadyBoughtController(ShoppingListService)
    {
        var bought = this;
        bought.boughtcontent = function(){
            try{
                bought.ErrorMessage ="";
            return ShoppingListService.boughtcontent();
            }
            catch(error)
            {
            bought.ErrorMessage = error.message;
            }
        }
    }

    //service function starts here

    function ShoppingListService()
    {
        var service = this;
        service.name="srikar";
        var boughtlist=[];
        var tobuyitems = [
            {
            name:'cookies',
            quantity:"10 bags"
            },
            {
             name:"Drinks",
             quantity:"10 bottiles"
            },
            {
                name:"rice",
                quantity:"1 kg"
            },
            {
                name:"milk",
                quantity:"3 packets"
            },
            {
                name:"oil",
                quantity:"3 litre's"
            }
        ];

    //function to get the items in tobuy list
        service.getItems = function(){
            if(tobuyitems.length > 0)
            {
                return tobuyitems;
            }
            else{
                throw new Error("Everything is bought!");
            }
        }
    // when button clicked remove from buy list and add in bought list

        service.removeandpush = function(index){
         var removed =tobuyitems[index];
         boughtlist.push(removed);
         tobuyitems.splice(index,1);
        }

        //items that are selected in tobuy list and returned to display in bought list

        service.boughtcontent = function(){
            if(boughtlist.length > 0)
            {
                return boughtlist;
            }
            else{
                throw new Error("Nothing  bought yet!");
            }
        }
    }
})();