Ext.define('Melisa.view.phone.window.confirmation.WithReportController', {
    extend: 'Melisa.view.universal.window.confirmation.WithReportController',
    alias: 'controller.windowconfirmationwithreportcontroller',
    
    requires: [
        'Melisa.view.universal.window.confirmation.WithReportController'
    ],
    
    showLoadingMessage: function() {
        
        var me = this;
        
        me.activateModule(me.getView());
        
    },
    
    closeWindow: function() {
        
        this.activateMainModule();
        
    }
    
});
