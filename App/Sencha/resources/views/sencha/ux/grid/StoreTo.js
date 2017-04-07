Ext.define('Melisa.ux.grid.StoreTo', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridstoreto',
    
    init: function(grid) {
        
        var me = this;
        
        grid.getJson = Ext.bind(me.getJson, me);
        grid.getValues = Ext.bind(me.getValues, me);
        
    },
    
    getValues: function() {
        
        var me = this,
            store = me.getCmp().getStore();
        
        return Ext.pluck(store.data.items, 'data');
        
    },
    
    getJson: function (map) {
        
        var me = this;
        
        if( Ext.isFunction(map)) {
            return Ext.encode(me.getValues().map(map));
        }
        
        return Ext.encode(me.getValues());
        
    }
    
});
