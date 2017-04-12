Ext.define('Melisa.view.universal.dashboard.WrapperModel', {
    extend: 'Ext.app.ViewModel',    
    alias: 'viewmodel.appmainmodel',
    
    data: {
        appName: 'Melisa Panel',
        identityName: 'Luis Heredia',
        moduleActive: {
            title: null
        },
        route: 'home'
    },
    
    stores: {
        applications: {},
        menuMain: {
            type: 'tree',
            proxy: {
                type: 'memory'
            },
            root: {
                expanded: true
            }
        }
    },
    
    formulas: {
        showclosemodule: function(get) {
            
            return get('moduleActive.title') ? false : true;
            
        }
    }
    
});
