Ext.define('Melisa.core.ProfilePhone', {
    extend: 'Ext.app.Profile',
    
    view: null,
    
    isActive: function() {        
        return Ext.platformTags.phone || Ext.platformTags.modern;        
    },
    
    launch: function() {
        
        var me = this;
        
        Ext.require([
            me.view
        ], function() {
            
            Ext.Viewport.add(Ext.create(me.view));

        });
        
    }
    
});
