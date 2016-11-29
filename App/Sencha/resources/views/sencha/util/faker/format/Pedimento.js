Ext.define('Melisa.util.faker.format.Pedimento', {
    singleton: true,
    
    init: function() {
        
        jsf.format('pedimento', function(gen, schema) {
            
            return gen.chance.pickone(['160', '190']) + 
                ' ' +
                gen.faker.address.zipCode() + 
                ' ' +
                gen.faker.helpers.replaceSymbolWithNumber('#######');
            
        });
        
    }
    
});
