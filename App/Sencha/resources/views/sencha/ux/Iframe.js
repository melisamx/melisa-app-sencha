Ext.define('Melisa.ux.Iframe', {
    extend: 'Ext.ux.IFrame',
    alias: 'widget.uxiframe',
    
    requires: [
        'Ext.ux.IFrame'
    ],
    
    print: function() {
        
        var me = this,
            frame = me.getFrame();
    
        frame.contentWindow.focus();
        frame.contentWindow.print();
        
    }
    
});
