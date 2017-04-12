Ext.define('Melisa.view.phone.default.Screen', {
    extend: 'Ext.Container',
    alias: 'widget.defaultscreen',
    
    hideAnimation: 'fadeOut',
    showAnimation: {
        type: 'slide',
        direction: 'right'
    },
    publishes: [
        'hidden'
    ]
});
