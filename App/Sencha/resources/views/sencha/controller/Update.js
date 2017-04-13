Ext.define('Melisa.controller.Update', {
    
    onSuccessLoadData: function (data) {
        
        var me = this,
            form = me.getViewForm();
        
        me.log('on success load data in controller update');
        me.appendFieldsHidden();
        
        if( Ext.platformTags.modern) {
            form.setValues(data);
        } else {
            form.getForm().setValues(data);
        }
        
        me.activateModule(me.getView());
        
    }
    
});
