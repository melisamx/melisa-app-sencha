Ext.define('Melisa.controller.AppendFields', {
    
    appendFieldsHidden: function() {
        
        var me = this,
            form = me.getViewForm(),
            vm = me.getViewModel(),
            fieldsHidden = vm.get('fieldsHidden');
        
        /* no especific id fields, use standard id field */
        if( !fieldsHidden) {
            fieldsHidden = [ 'id' ];
        }
        
        if( Ext.isString(fieldsHidden)) {
            fieldsHidden = [fieldsHidden];
        }
        
        Ext.each(fieldsHidden, function(name) {
           
            form.add({
                xtype: 'textfield',
                hidden: true,
                name: name,
                bind: {
                    value: '{' + name + '}'
                }
            });
            
        });
        
    }
});
