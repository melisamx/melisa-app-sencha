Ext.define('Melisa.view.phone.vuejs.Switch', {
    extend: 'Ext.Component',
    alias: 'widget.vuejsswitch',
    
    requires: [
        'Melisa.ux.vuejs.Material'
    ],
    
    config: {
        vueInstance: null,
        name: null,
        value: 1
    },
    
    template: [
        {
            tag: 'md-switch',
            reference: 'component',
            classList: [
                Ext.baseCSSPrefix + 'vuejs',
                'md-primary'
            ]
        }
    ],
    
    initialize: function() {
        
        var me = this,
            id = me.element.getId();
        
        me.callParent();
        
        me.element.on('painted', 'onPainted', me, {
            single: true
        })
        
        me.component.set({
            'v-model': 'checked',
            name: id,
            id: id
        });        
        
    },
    
    onPainted: function() {
        
        var me = this,
            config = me.getConfig();
        
        me.setVueInstance(new Vue({
            el: '#' + this.element.getId(),
            data: {
                checked: config.value
            }
        }));
        console.log(me.getVueInstance());
    }
    
});
