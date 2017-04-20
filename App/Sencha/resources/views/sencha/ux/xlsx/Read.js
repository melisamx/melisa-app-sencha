Ext.define('Melisa.ux.xlsx.Read', {
    singleton: true,
    
    config: {
        sheet: null
    },
    
    getValuesToObject: function(config) {
        
        var me = this,
            property,
            result = {};
        
        for(property in config) {
            result [property]= me.getCellValue(config[property]);
        }
        
        return result;
        
    },
    
    getCellValue: function(cell) {
        
        var me = this,
            sheet = me.getSheet();
        
        if( Ext.isEmpty(sheet[cell])) {
            return null;
        }
        
        return sheet[cell].v;
        
    },
    
    convertBoolean: function(value) {
        
        return value === 'SI' ? true : false;
        
    }
});
