Ext.define('Melisa.controller.View', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.view',
    
    requires: [
        'Melisa.core.ViewController',
        Ext.platformTags.desktop ? 
            'Melisa.view.desktop.default.WindowReport' : 
            'Melisa.view.phone.default.WindowReport'
    ],
    
    sendLoadData: function(module, options, grid, fields) {        
        var me = this,
            selection = me.getView().down(grid).getSelection();
        
        if( selection.length === 0) {
            return;
        }
        
        if( Ext.isFunction(fields)) {
            module.fireEvent('loaddata', fields.call(me, selection), options.launcher);
        } else {
            module.fireEvent('loaddata', {
                id: selection[0].get('id')
            }, options.launcher);
        }        
    },
    
    onLoadedModuleUpdate: function(module, options) {
        module.fireEvent('loaddata', {
            id: options.launcher.getViewModel().get('record').get('id')
        }, options.launcher);
    },
    
    onUpdatedRecord: function() {
        var me = this,
            storeReload = me.storeReload;
        if( !storeReload) {
            return;
        }
        this.getViewModel().getStore(storeReload).load();
    },
    
    onShowItemReport: function(v, record) {
        var me = this,
            winReport = me.getWindowReport(record),
            winReportConfig = me.windowReportConfig,
            urlReport = me.getUrlWindowReport(record);
        
        if( winReportConfig.nocache) {
            urlReport += [
                '?nc=',
                record.data.updatedAt ? 
                    record.data.updatedAt : new Date().toTimeString()
            ].join('');
        }
        
        if( winReportConfig.neverCache) {
            urlReport += new Date().toString();
        }
        
        me.showWindowReport(winReport, record, urlReport);
    },
    
    showWindowReport: function(winReport, record, url) {
        winReport.getViewModel().set('id', url);
        winReport.showBy(Ext.getBody(), 'tr-tr', [ '-80%', '100%' ]);
    },
    
    getUrlWindowReport: function(record) {
        return record.get('id') + '/html/';
    },
    
    getWindowReport: function() {
        var me = this,
            vm = me.getViewModel(),
            windowReport = me.windowReport,
            windowReportConfig = Ext.applyIf(me.windowReportConfig || {}, {
                alias: 'widget.melisaDefaultWindowReport',
                title: 'Report',
                vmReport: 'modules.report',
                nocache: true,
                neverCache: false
            });
    
        if( me.windowReport) {
            return me.windowReport;
        }
        
        return me.windowReport = Ext.create(windowReportConfig.alias, {
            viewModel: {
                data: {
                    title: windowReportConfig.title,
                    url: vm.get(windowReportConfig.vmReport)
                }
            }
        });
    }
    
});
