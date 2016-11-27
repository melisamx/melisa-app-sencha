Ext.define('Melisa.core.ViewController', {
    extend: 'Ext.app.ViewController',
    
    mixins: [
        'Melisa.core.Base'
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
