Ext.define('Melisa.ux.grid.window.Report', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridWindowReport',
    
    config: {
        nocache: true,
        title: 'Report',
        aliasWindow: 'widget.melisaDefaultWindowReport',
        windowReport: null,
        urlReport: null
    },
    
    init: function(component) {
        var me = this;
        component.on('itemdblclick', me.showWindowReport, me);        
    },
    
    showWindowReport: function(v, record) {
        var me = this,
            windowReport = me.getWindowReport();
            
        if( !windowReport) {
            windowReport = me.createWindowReport(record);
        }
        
        if( !me.getCmp().fireEvent('beforeShowWindowreport', windowReport, record)) {
            return true;
        }
        
        windowReport.showBy(Ext.getBody(), 'tr-tr', [ '-80%', '100%' ]);
    },
    
    createWindowReport: function(record) {
        var me = this;
        return Ext.create(me.getAliasWindow(), {
            viewModel: {
                data: {
                    title: me.getTitle()
                }
            }
        });
    }
});