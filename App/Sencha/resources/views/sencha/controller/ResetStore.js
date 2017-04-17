Ext.define('Melisa.controller.ResetStore', {
    
    resetStores: function() {
        
        var me = this,
            vm = me.getViewModel(),
            stores = vm.storeInfo,
            key;
           console.log(stores); 
        
        for(key in stores) {
            stores[key].removeAll(true);
        } 
        
    }
    
});
