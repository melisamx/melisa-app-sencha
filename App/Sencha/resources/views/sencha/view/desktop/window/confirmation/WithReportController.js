Ext.define('Melisa.view.desktop.window.confirmation.WithReportController', {
    extend: 'Melisa.view.universal.window.confirmation.WithReportController',
    alias: 'controller.windowconfirmationwithreportcontroller',
    
    requires: [
        'Melisa.view.universal.window.confirmation.WithReportController'
    ],
    
    /**
     * Set url form
     * override Melisa.controller.Create
     */
    onReady: function() {
        
        var me = this;
        me.getView().down('form').url = me.getViewModel().get('modules.submit');
        
    },
    
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
