
Ext.define('Melisa.core.ProfileTablet', {
    extend: 'Ext.app.Profile',
    
    view: null,
    css: null,

    isActive: function() {
        
        return Ext.platformTags.tablet;
        
    },
    
    launch: function() {
        
        var me = this;
        
        /* inyectamos css especifico a la tablet  */
        Ext.require([
            /* necesario para que se detecte correctamente la orientacion  */
            /* este bug esta corregido en la versión de pago 6.0.2  */
            'Melisa.override.Viewport',
            'Melisa.override.Button',
            'Melisa.override.List',

            /* necesario para la carga CSS, esta funcionalidad el
             * modern no la contempla  */
            'Melisa.ux.util.CSS',
            me.view
        ], function() {
            
            Melisa.ux.util.CSS.swapStyleSheet('tablet', '/' + me.css + '/css/main-tablet.css');
            Ext.Viewport.add(Ext.create(me.view));
            
        });
        
    }
});
