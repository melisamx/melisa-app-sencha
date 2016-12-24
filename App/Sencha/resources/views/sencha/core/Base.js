Ext.define('Melisa.core.Base', {
    
    requires: [
        'Melisa.core.Logger'
    ],
    
    log: function() {
        
        var args = Array.prototype.slice.call(arguments);
        args.unshift(Ext.ClassManager.getName(this) + ' -> ');
        
        return Melisa.core.Logger.log.apply(Melisa.core.Logger, args);
        
    }
    
});
