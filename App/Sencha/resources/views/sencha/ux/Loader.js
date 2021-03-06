/* 
 * Loader indicator
 */
Ext.define('Melisa.ux.Loader', {
    singleton: true,
    
    constructor: function() {
        
        this.destroy();
        
    },
    
    destroy: function() {
        
        var loader = Ext.get('loader');
        
        if( !loader) {
            
            return;
            
        }
        
        setTimeout(function() {
            
            loader.addCls('fadeOut');
        
            setTimeout(function() {
                loader.destroy();
            }, 1000);
            
        }, 1);
        
    }
    
});
