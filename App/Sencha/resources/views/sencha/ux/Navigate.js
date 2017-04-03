Ext.define('Melisa.ux.Navigate', {
    
    navigateTo: function(component) {
        
        var me = this,
            view = me.getView(),
            cmp = me.lookup(component);
        
        view.setActiveItem(cmp);
        return cmp;
        
    }
    
});
