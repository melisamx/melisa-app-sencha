Ext.define('Melisa.view.universal.menu.TreeOptions', {
    extend: 'Ext.list.Tree',
    alias: 'widget.apppaneltreeoptions',
    
    requires: [
        Ext.platformTags.classic ? 
            'Melisa.view.desktop.menu.TreeOptionsController' : 
            'Melisa.view.phone.menu.TreeOptionsController'
    ],
        
    controller: 'apppaneltreeoptions',
    ui: 'navigation',
    expanderFirst: false,
    defaults: {
        indent: 15
    }
        
});
