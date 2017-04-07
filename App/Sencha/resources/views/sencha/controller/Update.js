Ext.define('Melisa.controller.Update', {
    
    onSuccessLoadData: function (data) {
        
        var me = this,
            form = me.getViewForm();
        
        me.appendFieldsHidden();
        
        form.getForm().setValues(data);
        
    }
    
});
