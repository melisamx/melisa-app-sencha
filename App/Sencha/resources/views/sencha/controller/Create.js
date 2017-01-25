Ext.define('Melisa.controller.Create', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.create',
    
    requires: [
        'Melisa.core.ViewController',
        'Melisa.core.module.Create'
    ],
    
    mixins: [
        'Melisa.core.module.Create'
    ],
    
    onRender: function() {
        
        this.getView().getForm().url = this.getViewModel().get('modules.create');
        
    }
    
});
