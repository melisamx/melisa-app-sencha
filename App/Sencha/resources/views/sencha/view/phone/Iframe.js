Ext.define('Melisa.view.phone.Iframe', {
    extend: 'Ext.Component',
    alias: 'widget.uxiframe',
    
    config: {
        src: 'about:blank',
        loadMask: 'Loading...'
    },
    
    template: [
        {
            reference: 'iframe',
            width: '100%',
            height: '100%',
            frameborder: 0,
            classList: [
                Ext.baseCSSPrefix + 'uxiframe'
            ],
            tag: 'iframe'
        }
    ],
    
    initialize: function() {
        
        var me = this;
        
        me.callParent();
        
        me.iframe.set({
            name: me.iframe.id
        });
        
        me.iframe.on('load', me.onLoad, me)
        
    },
    
    initRenderData: function () {
        
        console.log('entro');
        
    },
    
    onLoad: function() {
        
        var me = this,
            doc = me.getDoc();
        
        me.up().unmask();
        
        if (doc) {
            me.fireEvent('load', me);
        } else if (me.src) {
            me.fireEvent('error', me);
        }
        
    },
    
    getDoc: function() {
        try {
            return this.getWin().document;
        } catch (ex) {
            return null;
        }
    },
    
    getWin: function() {
        var me = this,
            name = me.iframe.id,
            win = Ext.isIE ? me.iframe.dom.contentWindow : window.frames[name];
        return win;
    },
    
    updateSrc: function(src) {
        
        this.load(src);
        
    },
    
    load: function (src) {
        
        var me = this,
            text = me.getLoadMask(),
            iframe = me.iframe;
        
        if (me.fireEvent('beforeload', me, src) !== false) {
            
            if (text && me.el && me.isRendered()) {
                
                me.up().mask({
                    xtype: 'loadmask',
                    message: text
                });
            }
            
            iframe.set({
                src: src
            });
            
        }
        
    }
    
});