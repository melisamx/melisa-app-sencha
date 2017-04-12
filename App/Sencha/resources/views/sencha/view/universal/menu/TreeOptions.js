Ext.define('Melisa.view.universal.menu.TreeOptions', {
    extend: 'Ext.list.Tree',
    alias: 'widget.apppaneltreeoptions',
    
    config: {
        melisa: null
    },
    
    ui: 'navigation',
    expanderFirst: false,
    defaults: {
        indent: 15
    }
        
});
