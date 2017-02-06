Ext.define('Melisa.controller.View', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.view',
    
    requires: [
        'Melisa.core.ViewController'
    ],
    
    sendLoadData: function(module, options, grid, fields) {
        
        var me = this,
            selection = me.getView().down(grid).getSelection();
        
        if( selection.length === 0) {
            return;
        }
        
        if( Ext.isFunction(fields)) {
            module.fireEvent('loaddata', fields.call(me, selection), options.launcher);
        } else {
            module.fireEvent('loaddata', {
                id: selection[0].get('id')
            }, options.launcher);
        }
        
    }
    
});
