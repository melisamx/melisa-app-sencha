Ext.define('Melisa.override.core.ModuleTabs', {
    override: 'Melisa.core.Module',
    
    onReboot: function() {
        
        var me = this;
        
        console.log('reboot', arguments);
        
        if( Ext.platformTags.classic && me.getIsAutoShow()) {
            
            /* necesary or never show */
//            me.getEl().removeCls('x-hidden-offsets');
            me.show();
            
        }
        
        me.redirectToModule();
        
    }
    
});
