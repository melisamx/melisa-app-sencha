Ext.define('Melisa.ux.FullscreenEditor', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.fullscreeneditor',
    
    config: {
        clearIcon: false,
        scrollModifier: 1.8,
        editorMargin: 0,
        editor: null,
        originalParent: null,
        originalPosition: null,
        originalFlex: null,
        originalLabelWidth: null
    },
    
    init: function(cmp) {
        
        var me = this;
        
        cmp.on('focus', me.onFocus, me);
        
    },
    
    getConfigEditor: function() {
        
        var me = this;
        
        return {
            xtype: 'panel',
            floated: true,
            modal: true,
            hideOnMaskTap: true,
            centered: true,
            hidden: true,
            width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? '100%' : 400,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Siguiente',
                    handler: me.onTapBtnDone,
                    scope: me
                }
            ],
            listeners: {
                hide: 'onHideEditor',
                scope: me
            }
        };        
    },
    
    onHideEditor: function() {
        
        var me = this,
            originalParent = me.getOriginalParent(),
            cmp = me.getCmp();
    
        cmp.setFlex(me.getOriginalFlex());
        cmp.setLabelWidth(me.getOriginalLabelWidth());
        
        Ext.defer(function() {
            originalParent.insert(me.getOriginalPosition() + 1, cmp);
        }, 1);        
        
    },
    
    onTapBtnDone: function() {
        
        var me = this,
            editor = me.getEditor(),
            originalParent = me.getOriginalParent(),
            cmp = me.getCmp(),
            nextField = originalParent.getAt(me.getOriginalPosition() + 1);
        
        cmp.setFlex(me.getOriginalFlex());
        cmp.setLabelWidth(me.getOriginalLabelWidth());
        
        editor.hide();
        
        /* dot not support fieldset or container items */
        /* se deveria almacenar el ultimo item del parent para saber si busca items en parent */
        
        if( !nextField) {
            
            var parent = originalParent.getParent(),
                parentIndex = parent.innerIndexOf(originalParent);
            
            nextField = parent.getAt(parentIndex + 2);
            
        }
        
        originalParent.insert(me.getOriginalPosition() + 1, cmp);
        
        if( typeof nextField.isContainer !== 'undefined') {
            nextField = nextField.down('[isField=true]');
        }
        
        if( typeof nextField.focus === 'function') {
            nextField.focus();
        }
        
    },
    
    createEditor: function() {
        
        var me = this,
            editor = me.getEditor(),
            cmp = me.getCmp();
        
        if( editor) {
            cmp.setFlex(1);
            cmp.setLabelWidth('100%');
            editor.insert(0, cmp);
            return editor;
        }
        
        originalParent = cmp.getParent(),
        originalPosition = originalParent.innerIndexOf(cmp);
        me.setOriginalParent(originalParent);
        me.setOriginalPosition(originalPosition);
        me.setOriginalFlex(cmp.getFlex());
        me.setOriginalLabelWidth(cmp.getLabelWidth());
        
        cmp.setFlex(1);
        cmp.setLabelWidth('100%');
        
        editor = Ext.Viewport.add(me.getConfigEditor());
        editor.on('painted', me.onPaintedEditor, me);
        editor.insert(0, cmp);
        me.setEditor(editor);
        
        return editor;
        
    },
    
    onPaintedEditor: function() {
        
        var me = this,
            cmp = me.getCmp();
        
        cmp.focus();
        
    },
    
    onFocus: function() {
        
        var me = this,
            editor = me.createEditor();
        
        editor.show();
        
    }
    
});
