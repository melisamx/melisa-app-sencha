Ext.define('Melisa.view.desktop.window.delete.WithIframeController', {
    extend: 'Melisa.view.universal.window.delete.WithIframeController',
    alias: 'controller.windowdeletecontroller',
    
    requires: [
        'Melisa.view.universal.window.delete.WithIframeController'
    ],
    
    showLoadingMessage: function(message) {
        
        this.getView().setLoading(message);     
        
    },
    
    closeWindow: function() {
        
        this.getView().close();
        
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            view = me.getView().down('form'),
            vm = me.getViewModel();
    
        view.getForm().url = vm.get('modules.submit');
        me.submitForm(view, vm, extraParams, params);
        
    }
    
});
