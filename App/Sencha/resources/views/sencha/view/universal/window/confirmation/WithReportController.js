Ext.define('Melisa.view.universal.window.confirmation.WithReportController', {
    extend: 'Melisa.controller.Create',
    
    requires: [
        'Melisa.controller.Create',
        'Melisa.controller.LoadData',
        'Melisa.controller.AppendFields'
    ],
    
    mixins: {
        loaddata: 'Melisa.controller.LoadData',
        appendfields: 'Melisa.controller.AppendFields'
    },
        
    init: function() {
        
        var me = this,
            view = me.getView();
    
        me.callParent(arguments);
        
        view.on('ready', me.appendFieldsHidden, me, {
            single: true
        });
        
        view.on('loaddata', me.onLoadData, me);
                
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            form = me.getForm(),
            vm = me.getViewModel();
        
        me.submitForm(form, vm, extraParams, params);
        
    },
    
    onSuccessSubmit: function(response, action) {
        
        var me = this,
            view = me.getView(),
            form = me.getForm(),
            event = {
                autoClose: true
            };
        
        form.reset();
        view.fireEvent('successsubmit', event, response, action);
        me.closeWindow();
        
    },
    
    onClickBtnCancelar: function() {
        
        var me = this,
            view = me.getView();
    
        if( view.fireEvent('canceled') === false) {
            return;
        }
        
        me.closeWindow();
        
    }
    
});
