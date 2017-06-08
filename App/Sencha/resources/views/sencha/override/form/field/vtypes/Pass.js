Ext.define('Melisa.override.form.field.vtypes.Pass', {
    override: 'Ext.form.field.VTypes',
    
    pass: function(value, field) {        
        if( !field.fieldCheck) {            
            return true;
        }
        
        var fieldCheck = field.up().down('[itemId="' + field.fieldCheck + '"]');
        
        if( !fieldCheck) {            
            return true;            
        }
        
        /* requerido para poder quitar el error si no coincidian los pass */
        setTimeout(function() {            
            fieldCheck.validate();            
        }, 100);
        
        return (value === fieldCheck.getValue());
        
    },
    
    passText: 'Las contraseñas no coinciden',
    passMask: /[\w!@#$%^&*()\-_=+{};:,.]/i
    
});
