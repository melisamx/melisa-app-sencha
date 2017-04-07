Ext.define('Melisa.controller.LoadData', {
    
    config: {
        loadedData: false
    },
    
    onBeforeLoadData: function(event) {
        
        var me = this;
        
        if( me.getLoadedData()) {
            return false;
        }
        
        me.setLoadedData(true);
        
    },
    
    onLoadData: function(data, launcher) {
        
        var me = this,
            view = me.getView(),
            event = {
                cancel: false,
                data: data,
                launcher: launcher
            };
            
        if( view.fireEvent('beforeloaddata', data, event) === false || event.cancel) {
            me.log('cancel flow load data', event);
            return;
        }
        
        me.getViewModel().set(data);
        view.show(launcher || null);        
        me.loadRemoteData(data);
        
    },
    
    loadRemoteData: function(data) {
        
        var me = this,
            vm = me.getViewModel();
        
        /* necesary, force get data messageloading, since it does not work  */
        /* Apparently it is because the formula is not used in any component */
        vm.notify();
        
        me.showLoadingMessage(vm.get('messageloading'));
        
        Ext.Ajax.request({
            url: me.getUrlRemoteData(data),
            method: 'GET',
            success: me.onSuccessLoadRemoteData,
            failure: me.onFailureLoadRemoteData,
            scope: me
        });
        
    },
    
    getUrlRemoteData: function(data) {
        
        var me = this,
            vm = me.getViewModel();
    
        return vm.get('modules.report') + data.id + '/json/';
        
    },
    
    onSuccessLoadRemoteData: function(request) {
        
        var me = this,
            view = me.getView(),
            report = Ext.decode(request.responseText, true),
            event = {
                cancel: false,
                report: report
            };
        
        if( view.fireEvent('successloadremotedata', report.data, event) === false || event.cancel) {
            me.log('cancel flow success load remote data', event);
            return;
        }
        
        me.showLoadingMessage(false);
        
        if( report.success) {
            return;
        }
        
        me.closeWindow();
        
    },
    
    showLoadingMessage: function() {
        
        console.log('message');
        
    },
    
    closeWindow: function() {
        
        console.log('closeWindow');
        
    }
    
});
