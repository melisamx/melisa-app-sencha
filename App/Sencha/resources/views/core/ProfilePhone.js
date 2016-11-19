
Ext.define('Melisa.core.ProfilePhone', {
    extend: 'Ext.app.Profile',
    
    view: null,
    
    isActive: function() {
        
        return Ext.platformTags.phone;
        
    },
    
    launch: function() {
        
        var me = this;
        
        Ext.require([
            /* necesario para que se detecte correctamente la orientacion  */
            /* este bug esta corregido en la versión de pago 6.0.2  */
            'Nerine.override.Viewport',
            'Nerine.override.Button',
            'Nerine.override.List',

            /* necesario para la carga CSS, esta funcionalidad el
             * modern no la contempla  */
            'Nerine.ux.util.CSS',
            me.view
        ], function() {
            
            Ext.Viewport.add(Ext.create(me.view));

        });
        
    }
    
});
