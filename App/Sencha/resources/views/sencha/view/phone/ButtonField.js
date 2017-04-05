Ext.define('Melisa.view.phone.ButtonField', {
    extend: 'Ext.Container',
    alias: 'widget.buttonfield',
    
    requires: [
        'Melisa.view.phone.ButtonLabel'
    ],
    
    layout: 'fit',
    cls: 'buttonfield',
    config: {
        list: null,
        title: null,
        activate: null,
        wrapper: '#wrapper',
        buttonReturn: '#btnReturn'
    },
    
    constructor: function(config) {
        
        var me = this;
        
        me.callParent(arguments);
        
        me.addButton(config);
        me.addHiddenField(config);
        
    },
    
    setValue: function(value, description) {
        
        this.down('textfield').setValue(value);
        
        if( description) {
            this.setDescription(description);
        }
        
    },
    
    setDescription: function(value) {
        
        this.down('buttonlabel').setDescription(value);
        
    },
    
    addHiddenField: function(config) {
        
        if( !config.hiddenField) {
            config.hiddenField = {
                name: config.name
            };
        }
        
        this.add(Ext.applyIf(config.hiddenField, {
            xtype: 'textfield',
            hidden: true
        }));
        
    },
    
    addButton: function(config) {
        
        var me = this;
        
        if( !config.button) {
            config.button = {
                text: config.text || '' ,
                description: config.description || '&nbsp;'
            };
        }
        
        me.add(Ext.applyIf(config.button, {
            xtype: 'buttonlabel',
            handler: me.onTapButton,
            scope: me
        }));
        
    },
    
    onTapButton: function() {
        
        var me = this,
            view = me.up(me.getWrapper()),
            activeItem = view.getActiveItem(),
            list = view.down(me.getList()),
            store = list.getStore(),
            title = view.down(me.getTitle());
        
        me.setActivate(activeItem);
        view.setActiveItem(list);
        
        if( !store.getCount()) {
            store.load();
        }
        
        list.on('disclose', me.onDisclose, me, {
            single: true
        });
        
        list.on('itemtap', me.onItemTap, me, {
            single: true
        });
        
        title.down(me.getButtonReturn()).on('tap', me.onTabBtnReturn, me, {
            single: true
        });
        
    },
    
    onTabBtnReturn: function() {
        
        var me = this,
            view = me.up(me.getWrapper());
        
        view.setActiveItem(me.getActivate());
        
    },
    
    onItemTap: function(t, i, t, record) {
        this.onDisclose(t, record);
    },
    
    onDisclose: function(l, record) {
        
        var me = this,
            view = me.up(me.getWrapper()),
            activate = me.getActivate();
        
        me.setValue(record.get('id'), record.get('name'));
        view.setActiveItem(activate);
            
    }

});
