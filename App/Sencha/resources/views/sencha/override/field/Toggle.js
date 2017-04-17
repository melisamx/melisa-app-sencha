Ext.define('Melisa.override.field.Toggle', {
    override: 'Ext.field.Toggle',
    
    initialize: function() {
        var me = this;
        me.callParent();
        
        me.publishState('value', this.getValue());
        me.on('painted', me.onPaintedFix, me);
    },
    
    /* fix painted, but tap result equals T_T */
    onPaintedFix: function() {
        
        var me = this,
            value = me.getValue(),
            thumb = me.el.down('.x-thumb'),
            style = thumb.getStyle('left');
        
        if( style === '-27px') {
            thumb.setStyle('left',value ? '15px' : '0px');
            me.setValue(value);
        }
        
    }
});
