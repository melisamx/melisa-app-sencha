Ext.define('Melisa.ux.ComboAutoSelect', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.comboautoselect',
    
    config: {
        callback: null
    },
    
    init: function(component) {
        var me = this;
        
        me.onLoadStore();
        
        component.on('afterrender', me.onRender, me, {
            single: true
        });
    },
    
    onRender: function() {    
        Ext.defer(this.onLoadStore, 1000, this);
    },
    
    onLoadStore: function() {
        var me = this,
            cmp = me.getCmp(),
            record = cmp.getStore().first(),
            callBack = me.getCallback();
    
        if( callBack) {
            me.callBack(cmp, store, record);
            return;
        }
        
        if( !record) {
            return;
        }
        
        cmp.select(record);
    }
});
    