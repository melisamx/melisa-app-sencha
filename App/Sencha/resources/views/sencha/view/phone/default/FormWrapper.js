Ext.define('Melisa.view.phone.default.FormWrapper', {
    extend: 'Ext.form.Panel',
    alias: 'widget.defaultformwrapper',
    
    hideAnimation: 'fadeOut',
    showAnimation: {
        type: 'slide',
        direction: 'right'
    },
    publishes: [
        'hidden'
    ]
});
