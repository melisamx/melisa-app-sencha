Ext.define('Melisa.util.faker.Faker', {
    singleton: true,
    
    requires: [
        'Melisa.util.faker.format.Pedimento',
        'Melisa.util.faker.format.Referencia'
    ],
    
    mixins: [
        'Ext.mixin.Mashup'
    ],
    
    requiredScripts: [
        '/vendor/json-schema-faker/release/json-schema-faker.min.js'
    ],
    
    config: {
        locale: 'es_MX',
        formats: [
            'Melisa.util.faker.format.Pedimento',
            'Melisa.util.faker.format.Referencia'
        ]
    },
    
    constructor: function() {
        
        var me = this;
        
        me.initConfig();
        
        if( typeof jsf === 'undefined') {
            
            console.log('no import library faker');
            return;
            
        }
        
        jsf.extend('faker', function(faker) {
            faker.locale = me.getLocale();
            return faker;
        });
        
        Ext.each(me.getFormats(), function(faker) {
            
            Ext.ClassManager.get(faker).init();
            
        });
        
    }
    
});
