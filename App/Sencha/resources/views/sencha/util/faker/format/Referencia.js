Ext.define('Melisa.util.faker.format.Referencia', {
    singleton: true,
    
    init: function() {
        
        jsf.format('referencia', function(gen, schema) {
            
            return gen.chance.pickone(['A', 'B', 'C', 'D', 'E', 'F', 'G']) + 
                gen.faker.helpers.replaceSymbolWithNumber('########');
            
        });
        
    }
    
});
