
Ext.define('Melisa.core.Instanciador', {
    extend: 'Melisa.core.Base',
    
    singleton: true,
    
    requires: [
        'Melisa.core.Base',
        'Melisa.core.AutoOpenModule'
    ],
    
    getExtrasDependencias: function() {
        
        return [
            'Melisa.store.core.Base'
        ];
        
    },
    
    getWrapperClass: function(wrapperType, type) {
        
        return 'Melisa.core.wrapper.' + 
            wrapperType + 
            '.' +
            Ext.String.capitalize(type);
        
    },
    
    getDependencias: function() {
        
        return {
            apppanel: [
                'Melisa.core.wrapper.AppPanel'
            ],
            read: [
                'Melisa.core.wrapper.panel.Read',
                'Melisa.core.wrapper.window.Read'
            ],
            create: [
                'Melisa.core.wrapper.panel.Create',
                'Melisa.core.wrapper.window.Create'
            ],
            update: [
                'Melisa.core.wrapper.panel.Update',
                'Melisa.core.wrapper.window.Update'
            ]
        };
        
    },
    
    create: function(config) {
        
        var me = this,
            extraDependencias = me.getExtrasDependencias(),
            moduloPatron = me.getDependencias(),
            dependencias = [];
    
        me.log('create', config);
        
        if(typeof config.typ === 'undefined') {
            
            config.typ = 'create';
            
        }
        
        dependencias = dependencias.concat(extraDependencias);
        
        if(typeof moduloPatron[config.typ] !== 'undefined') {
            
            dependencias = dependencias.concat(moduloPatron[config.typ]);
            
        }
        
        me.log('inyect dependencias', dependencias);
        
        config.req_css | me.loadCss(config.req_css);
        
        Ext.require(dependencias, function() {
            
            me.loadScripts.call(me, config);
            
        });
        
    },
    
    createLogic: function(config) {
        
        var me = this,
            ge = Ext.GlobalEvents,
            moduloPatron = me.getDependencias(),
            wrapperClass = me.getWrapperClass(config.mod.wrapperType || 'panel', config.typ),
            actionDefault = Ext.applyIf({
                    autoConstrain: true,
                    autoRun: true,
                    autoRegister: true
                },
                config.mod
            ),
            modulo,
            component = config.cmp;
        
        config.mod.ns = config.ns;
        
        me.log('before create instance', moduloPatron[config.typ] || config.typ);
        
        if(config.mod.view) {
            
            /* 
             * necesario para que a nivel de plugins se tenga la confiuración
             * del wrapper y no depender del evento render del componente
             * 
             */
            
            if( !config.mod.widget) {
             
                component.items = [
                    {
                        xclass: config.mod.view
                    }
                ];
                
            } else {
                
                component.items = [
                    {
                        xtype: config.mod.widget
                    }
                ];
                
            }
            
        }
        
        if(typeof moduloPatron[config.typ] !== 'undefined') {
            
            /* fix bug extjs modern  */
            modulo = Ext.create(wrapperClass, component, config.mod);
            
        } else {
            
            modulo = Ext.create(wrapperClass, component, config.mod);
            
        }
        
        me.log('instance create success', modulo);
        
        ge.fireEvent('instancecreate', config.mod.ns, modulo);
        
        if( actionDefault.autoRegister) {
            
            ge.fireEvent('loaderregistermodule', modulo);
            
        }
        
        if( actionDefault.autoConstrain) {
            
            ge.fireEvent('main:constrain', modulo);
            
        }
        
        if( !actionDefault.autoRun) {
            
            return;
            
        }
        
        modulo.fireEvent('firstrun', modulo);
        
    },
    
    loadRequiresModulo: function(config) {
        
        var me = this;
        
        if( !config.req_mod) {
            
            me.createLogic(config);
            return;
            
        }
        
        me.log('load module', config.req_mod);
        
        Ext.GlobalEvents.fireEvent('loadmodule', config.req_mod, function() {
            
            me.createLogic(config);
            
        });
        
        delete config.req_mod;
        
    },
    
    loadRequires: function(config) {
        
        var me = this;
        
        me.log('load requires', config);
        
        if( typeof config.req === 'undefined' || !config.req.length) {
            
            me.loadRequiresModulo(config);
            return;
            
        }
        
        Ext.require(config.req, function() {
            
            me.loadRequiresModulo(config);
            
        });
        
        delete config.req;
        
    },
    
    loadScripts: function(config) {
        
        var me = this,
            i,
            ultimoJs;
        
        me.log('load scripts', config.req_js);
        
        /* necesario por que por defaul es un []  */
        if( typeof config.req_js === 'undefined' || 
            typeof config.req_js.length === 'number' && config.req_js.length === 0) {
            
            me.loadRequires(config);
            return;
            
        }
        
        if( typeof config.req_js.length === 'number') {
            
            for(i in config.req_js) {
                
                Ext.Loader.loadScript(config.req_js[i]);
                
            }
            
            me.loadRequires.call(me, config);
            delete config.req_js;
            return;
            
        }
        
        config.req_js.onLoad = function() {
            
            me.loadRequires.call(me, config);
            
        };
        
        Ext.Loader.loadScript(config.req_js);
        
        delete config.req_js;
        
    },
    
    loadCss: function(config) {
        
        var me = this;
        
        if(typeof config.id === 'undefined') {
            
            for(var style in config) {
                
                me.loadCss(config[style]);
                
            }
            
            return;
            
        }
        
        me.log('load style', config);
        
        Ext.util.CSS.swapStyleSheet(config.id, config.url);
        
    }
    
});
