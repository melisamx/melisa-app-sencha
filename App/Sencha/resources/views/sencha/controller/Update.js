Ext.define('Melisa.controller.Update', {
    
    onSuccessLoadData: function (data) {
        
        var me = this,
            form = me.getForm();
        
        me.appendFieldsHidden();
        
        form.getForm().setValues(data);
        
    }
    
});
