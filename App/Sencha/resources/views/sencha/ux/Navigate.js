Ext.define('Melisa.ux.Navigate', {
    
    navigateTo: function(component) {
        
        var me = this,
            view = me.getView();
        
        view.setActiveItem(me.lookupReference(component));
        
    }
    
});
