Ext.define('Melisa.view.phone.pitcher.ButtonController', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.pitcherbutton',
    
    init: function() {
        
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel();
        
        viewModel.set({
            fieldHidden: view.getName(),
            buttonText: view.getText()
        });
        
    },
    
    onTapBtnPitcher: function(button) {
        
        var me = this;
        
        me.moduleRun(button, Ext.bind(me.onPitcherReady, me), Ext.bind(me.onPitcherReady, me));
        
    },
    
    onPitcherReady: function(module) {
        
        var me = this;
        
        me.getView().fireEvent('readymodule', module);
        
        module.on('itemselect', me.onItemSelect, me, {
            single: true
        });
        
    },
    
    onItemSelect: function(record) {
        
        var me = this;
        
        me.getViewModel().set('itemSelected', record.get('id'));
        
    }
    
});
