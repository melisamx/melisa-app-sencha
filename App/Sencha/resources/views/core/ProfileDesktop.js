
Ext.define('Melisa.core.ProfileDesktop', {
    extend: 'Ext.app.Profile',
    
    view: null,
    
    isActive: function() {
        
        return Ext.platformTags.desktop;
        
    },
    
    launch: function() {
        
        Ext.require(this.view, function(a) {
            
            Ext.create(a);
            
        });
        
    }
    
});
