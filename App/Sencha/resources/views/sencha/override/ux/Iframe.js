Ext.define('Melisa.override.ux.Iframe', {
    override: 'Ext.ux.IFrame',
    
    config: {
        src: 'about:blank'
    },
    
    publishes: [
        'src'
    ],
    
    setSrc: function(url) {
        
        var me = this;
        
        me.src = url;
        
        if(me.isVisible()) {
            me.load(url);
        }
        
    }
    
});
