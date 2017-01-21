Ext.define('Melisa.view.phone.window.delete.WithIframeController', {
    extend: 'Melisa.view.universal.window.delete.WithIframeController',
    alias: 'controller.windowdeletecontroller',
    
    requires: [
        'Melisa.view.universal.window.delete.WithIframeController'
    ],
    
    showLoadingMessage: function() {
        
        var me = this;
        
        me.activateModule(me.getView());
        
    },
    
    closeWindow: function() {
        
        this.activateMainModule();
        
    }
    
});
