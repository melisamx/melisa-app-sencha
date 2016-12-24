Ext.define('Melisa.core.Logger', {
    singleton: true,
    
    config: {
        logger: null,
        debug: false
    },
    
    constructor: function() {
        
        var me = this,
            config = Ext.manifest.melisa;
        
        me.setDebug(config.debug);
        
    },
    
    log: function() {
        
        var me = this,
            logger = me.getLogger(),
            args = arguments;
        
        if( !console || !me.getDebug()) {
            
            return me;
            
        }
        
        if( logger) {
            
            logger.log.call(me, args);
            return me;
            
        }
        
        console.log.apply(console, args);
        
    }
    
});