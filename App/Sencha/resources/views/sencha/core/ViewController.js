Ext.define('Melisa.core.ViewController', {
    extend: 'Ext.app.ViewController',
    
    mixins: !Ext.platformTags.classic ? [
        'Melisa.core.Base',
        'Melisa.ux.Navigate'
    ] : [
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
    
    onRender: function() {},
    
    showError: function(title, message, callback, scope) {
        
        Ext.Msg.alert(title, message, callback, scope);
        
    },
    
    activateMainModule: function() {
        
        this.activateModule();
        
    },
    
    activateModule: function(module) {
        
        Ext.GlobalEvents.fireEvent('activatemodule', module);
        
    }
        
});
