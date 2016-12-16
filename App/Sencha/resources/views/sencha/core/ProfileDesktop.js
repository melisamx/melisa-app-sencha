
Ext.define('Melisa.core.ProfileDesktop', {
    extend: 'Ext.app.Profile',
    
    view: null,
    
    isActive: function() {
        
        return Ext.platformTags.desktop && Ext.platformTags.classic;
        
    },
    
    launch: function() {
        
        Ext.require(this.view, function(a) {
            
            Ext.create(a);
            
        });
        
    }
    
});
