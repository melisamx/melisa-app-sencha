Ext.define('Melisa.view.desktop.ButtonRecord', {
    extend: 'Ext.button.Button',
    alias: 'widget.buttonRecord',
    
    viewModel: {},
    
    setRecord: function(record) {
        var me = this;
        me.record = record;
        me.getViewModel().set('record', record);
    }
    
});
