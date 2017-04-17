Ext.define('Melisa.controller.AppendFields', {
    
    config: {
        isAppendedFields: false
    },
    
    appendFieldsHidden: function() {
        
        var me = this,
            form = me.getViewForm(),
            vm = me.getViewModel(),
            view = me.getView(),
            fieldsHidden = vm.get('fieldsHidden'),
            /* fix error ui no show */
            appendFieldsTo = typeof view.getAppendFieldsTo !== 'undefined' ? 
                view.getAppendFieldsTo() : null;
    
        if( me.getIsAppendedFields()) {
            me.log('ignore append fields');
            return;
        } else {
            me.setIsAppendedFields(true);
        }
        
        /* no especific id fields, use standard id field */
        if( !fieldsHidden) {
            fieldsHidden = [ 'id' ];
        }
        
        if( Ext.isString(fieldsHidden)) {
            fieldsHidden = [fieldsHidden];
        }
        
        if( appendFieldsTo) {
            form = view.down('#' + appendFieldsTo);
        }
        
        me.log('append id fields hidden', fieldsHidden, form);
        
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
