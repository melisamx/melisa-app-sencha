Ext.define('Melisa.view.desktop.wrapper.panel.View', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Melisa.core.Module',
        'Melisa.ux.grid.Filters',
        'Melisa.ux.FloatingButton',
        'Melisa.ux.confirmation.Button'
    ],
    
    mixins: [
        'Melisa.core.Module'
    ],
    
    layout: 'border',
    reference: 'wrapper'
});
