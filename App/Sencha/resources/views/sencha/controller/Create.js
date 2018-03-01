Ext.define('Melisa.controller.Create', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.create',
    
    requires: [
        'Melisa.core.ViewController',
        'Melisa.controller.Submit'
    ],
    
    mixins: {
        submit: 'Melisa.controller.Submit'
    },
    
    init: function() {
        
        var me = this,
            view = me.getView();
        
        me.callParent(arguments);
        
        if( Ext.platformTags.modern) {
            return;
        }
        
        view.on('ready', me.onReady, me);        
    },
    
    onReady: function () {
        
        var me = this,
            form = me.getViewForm();
        
        if( !Ext.platformTags.modern) {
            form = form.getForm();
        }
        
        form.url = me.getViewModel().get('modules.submit');
        
    }
    
});
