Ext.define('Melisa.view.desktop.default.BrowseButton', {
    extend: 'Ext.form.field.FileButton',
    alias: 'widget.defaultbrowsebutton',
    
    config: {
        multi: false,
        onlyButton: true
    },
    
    initComponent: function() {
        
        var me = this;
        
        me.on({
            afterrender: me.onAfterRender,
            change: me.onChange,
            scope: me
        });
        
        me.callParent(arguments);
        
    },
    
    onChange: function(button, file) {
        
        var me = this,
            files = me.fileInputEl.dom.files;
        
        if( Ext.isString(button)) {
            return;
        }
        
        me.fireEvent('fileselected', me, files);
        
    },
    
    onAfterRender: function(button) {
        
        var me = this;
        
        if( !me.getMulti()) {
            return;
        }
        
        inputEl = button.fileInputEl;
        inputEl.dom.setAttribute('multiple', '1');
        
    }
    
});
