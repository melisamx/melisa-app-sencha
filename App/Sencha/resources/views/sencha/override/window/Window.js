Ext.define('Melisa.override.window.Window', {
    override: 'Ext.window.Window',
    
    bodyPadding: '15 12',
    
    onEsc: function(e) {
        var me = this;
        e.stopEvent();
//        Ext.Msg.confirm('Closing confirmation', 'YOU REALLY WANTS TO close',
//            function(btn) {
//                if (btn === 'yes') {
//                    me.close();
//                }
//            }
//        );
    }
    
});
