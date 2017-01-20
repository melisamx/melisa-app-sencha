Ext.define('Melisa.view.desktop.window.delete.WithIframeController', {
    extend: 'Melisa.core.ViewController',
    alias: 'controller.windowdeletecontroller',
    
    requires: [
        'Melisa.core.module.Create'
    ],
    
    mixins: [
        'Melisa.core.module.Create'
    ],
        
    init: function() {
        
        var me = this,
            view = me.getView();
        
        view.on('ready', me.appendFieldsHidden, me, {
            single: true
        });
        
        view.on('loaddata', me.onLoadData, me);
                
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
        
        me.getView().setLoading(vm.get('messageloading'));
        
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
        
        view.setLoading(false);
        
        if( report.success) {
            return;
        }
        
        view.close();
        
    },
    
    appendFieldsHidden: function() {
        
        var me = this,
            form = me.getView().down('form'),
            vm = me.getViewModel(),
            fieldsHidden = vm.get('fieldsHidden');
        
        /* no especific id fields, use standard id field */
        if( !fieldsHidden) {
            fieldsHidden = [ 'id' ];
        }
        
        if( Ext.isString(fieldsHidden)) {
            fieldsHidden = [fieldsHidden];
        }
        
        Ext.each(fieldsHidden, function(name) {
           
            form.add({
                xtype: 'hiddenfield',
                name: name,
                bind: {
                    value: '{' + name + '}'
                }
            });
            
        });
        
    },
    
    save: function(extraParams, params) {
        
        var me = this,
            view = me.getView().down('form'),
            vm = me.getViewModel();
        
        view.getForm().url = vm.get('modules.submit');
        
        me.submitForm(view, vm, extraParams, params);
        
    },
    
    onSuccessSubmit: function(response) {
        
        var me = this,
            view = me.getView(),
            form = view.down('form');
        
        form.reset();
        view.fireEvent('successsubmit', response);
        view.close();
        
    },
    
    onClickBtnCancelar: function() {
        
        var me = this,
            view = me.getView();
    
        if( view.fireEvent('canceled') === false) {
            return;
        }
        
        view.close();
        
    }
    
});
