
Ext.define('Melisa.core.Base', {
    mixins: [
        'Ext.mixin.Observable'
    ],
    
    config: {
        debug: false,
        logger: null,
        wrapper: null,
        configModule: null,
        version: 1
    },
    
    logPrefix: null,
    
    constructor: function(config) {
        
        var me = this;
        
        me.mixins.observable.constructor.call(me, config);
        
        me.logPrefix = Ext.getClassName(me) + ' >> ';
        
        Ext.GlobalEvents.on('loggerchange', me.onLoggerChange, me);
        
    },
    
    onLoggerChange: function(logger) {
        
        var me = this;
        
        me.setLogger(logger);
        
    },
    
    event: function() {
        
        return nerine.myevents;
        
    },
    
    log: function() {
        
        var me = this,
            logger = me.getLogger(),
            arg = arguments;
        
        if( !console || !me.getDebug()) {
            
            return me;
            
        }
        
        if( logger) {
            
            logger.log.call(me, arguments);
            return me;
            
        }
        
        if(Ext.isString(arg[0]) && me.logPrefix) {
            
            arg [0] = me.logPrefix + arg[0];
            
        }
        
        console.log.apply(console, arg);
        
        return me;
        
    }
    
});
