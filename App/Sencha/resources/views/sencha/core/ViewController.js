Ext.define('Melisa.core.ViewController', {
    extend: 'Ext.app.ViewController',
    
    mixins: [
        'Melisa.core.Base',
        !Ext.platformTags.desktop ? 'Melisa.ux.Navigate' : null
    ],
    
    init: function() {
        
        var me = this,
            view = me.getView(),
            renderEvent = Ext.platformTags.modern ? 'painted' : 'render';
    
        view.on(renderEvent, me.onRender, me, {
            single: true
        });
        
    },
    
    onRender: function() {}
        
});
