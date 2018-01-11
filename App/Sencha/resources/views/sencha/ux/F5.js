Ext.define('Melisa.ux.F5', {
    singleton: true,
    
    config: {
        cancelF5: true
    },
    
    constructor: function() {
        var me = this;
        document.onkeydown = Ext.bind(me.cancelF5, me);
    },
    
    cancelF5: function(e) {
        return (e.which || e.keyCode) != 116;
    }
});