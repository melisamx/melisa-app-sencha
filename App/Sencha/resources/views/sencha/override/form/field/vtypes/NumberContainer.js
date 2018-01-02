Ext.define('Melisa.override.form.field.vtypes.NumberContainer', {
    override: 'Ext.form.field.VTypes',
    
    numberContainer: function(value, field) {        
        var contenedorRegex = /^[A-Z]{0,4}$|^[A-Z]{4}[0-9]{1,7}$/,
            letras = '0123456789A_BCDEFGHIJK_LMNOPQRSTU_VWXYZ',
            nValor,
            nTotal = 0,
            nPow2 = 1,
            i;
        
        value = value.toUpperCase();
        
        if(value.length !== 11) {            
            return false;            
        }
        
        if( !contenedorRegex.test(value)) {            
            return false;            
        }
        
        for(i = 0; i < 10; i++ ) {            
            nValor = letras.indexOf(value.substr(i, 1));
            if (nValor < 0) return ' ';
            nTotal += nValor * nPow2;
            nPow2 *= 2;            
        }
        
        nTotal = nTotal % 11;
        if (nTotal >= 10) nTotal = 0;
        
        return value[10] === nTotal.toString();
    },
    
    numberContainerText: 'Numero de contenedor invalido (Ingrese en mayusculas)',
    numberContainerMask: /[A-Za-z0-9]/
    
});
