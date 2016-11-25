/**
 * 
 * @class Melisa.util.Loader
 * 
 * Clase singleton permite realizar la carga de módulos JavaScript
 * 
 */
Ext.define('Melisa.core.Loader', {
    extend: 'Melisa.core.Base',
    
    singleton: true,
    
    requires: [
        'Melisa.core.Base'
    ],
    
    config: {
        loaders: [],
        loadersCallbacks: [],
        loadersLoadeds: [],
        winNotifications: [],
        nsBases: {},
        debug: true
    },
    
    constructor: function() {
        
        var me = this;
        
        me.callParent(arguments);
        
        Ext.GlobalEvents.on({
            loadermodule: me.load,
            loaderregistermodule: me.registerModule,
            scope: me
        });
        
    },
    
    privates: {
        
        createLoader: function(cSuccess, cError, totalModulos) {
            
            var me = this,
                loaders = me.getLoaders(),
                loadersCallbacks = me.getLoadersCallbacks(),
                loadersLoadeds = me.getLoadersLoadeds(),
                idLoader = Math.random();
        
            me.log('before create loader', arguments);
            
            /* set loader unico */
            loaders [idLoader]= {};

            /* set callbacks */
            loadersCallbacks [idLoader]= {
                success: cSuccess,
                error: cError
            };

            /* set los modulos counter load */
            loadersLoadeds [idLoader]= {
                load: 0,
                total: totalModulos
            };
            
            me.log('loader create', idLoader);

            /* return id loader */
            return idLoader;
            
        },
        
        nsIsLoaded: function(nameSpace) {
            
            var me = this,
                module = this.getNsBases()[nameSpace];
            
            me.log('verify module is load?', nameSpace);
            
            /* obtenemos el nameSpace separado */
            return module ? module : false;
            
        },
        
        deleteLoader: function(idLoader) {
            
            var me = this;
            
            delete me._loaders[idLoader];
            delete me._loadersLoadeds[idLoader];
            delete me._loadersCallbacks[idLoader];
            delete me._winNotifications[idLoader];
            
        },
        
        finishLoader: function(loader) {
            
            var me = this,
                loaders = me.getLoaders(),
                loadersLoadeds = me.getLoadersLoadeds(),
                loadersCallbacks = me.getLoadersCallbacks(),
                module = me.nsIsLoaded(loader.config.nameSpace),
                bandera = 1;
            
            if( !loaders[loader.idLoader]) {
                
                me.log('loader no existente');
                return;
                
            }
            
            /* incrementamos counter */
            loadersLoadeds[loader.idLoader].load++;
            
            /* verificamos si ya se intentaron cargar todos los modulos */
            if(loadersLoadeds[loader.idLoader].load !== loadersLoadeds[loader.idLoader].total) {
                
                return;
                
            }

            me.log('loader finish');

            /* recorremos la lista de modulos a cargar */
            for(var i in loaders[loader.idLoader]) {

                /* verify si se cargo o no el modulo */
                if( !loaders[loader.idLoader][i]) {

                    bandera = 0;
                    break;
                    
                }

            }            
            
            if(bandera) {
                
                me.fireEvent('finishloadersuccess', loader.idLoader);

                setTimeout(function() {
                    
                    loadersCallbacks[loader.idLoader].success(module);
                    me.deleteLoader(loader.idLoader);
                    
                }, 1);

            } else {
                
                me.fireEvent('finishloadererror', loader);

                setTimeout(function() {
                    
                    loadersCallbacks[loader.idLoader].error(module);
                    me.deleteLoader(loader);
                    
                }, 1);

            }
            
        },
        
        onErrorLoad: function(xhr) {
            
            var me = this;
            
            me.log('error load module', xhr);
            
            Ext.GlobalEvents.fireEvent('loaderhide');
            
            setTimeout(function() {
                
                me.fireEvent('errorload', xhr.my);
                
            }, 1);
            
            me.finishLoader(xhr.my);
            
        },
        
        onBeforeSend: function(xhr) {
            
            var me = this;
            
            me.log('before load', xhr);
            
            me.fireEvent('beforeload', xhr.my);
            
            Ext.GlobalEvents.fireEvent('loadershow');
            
        },
        
        loadModulo: function(idLoader, configModulo) {
            
            var me = this,
                loaders = me.getLoaders(),
                jxhr;
            
            /* registramos en el loader el modulo a cargar */
            loaders [idLoader][configModulo.nameSpace]= false;
            
            jxhr = jQuery.ajax({
                data: {
                    sys: me.getVersion(),
                    mod: (configModulo.my_version || '')
                },
                url: configModulo.url,
                dataType: 'script',
                type: 'GET',
                cache: configModulo.cache || false,
                context: me,
                success: me.onSuccessLoad,
                beforeSend: me.onBeforeSend,
                error: me.onErrorLoad
            });
            
            jxhr.my = {
                config: configModulo,
                idLoader: idLoader
            };
            
        },
        
        onSuccessLoad: function(response, estatus, xhr) {
            
            var me = this,
                loaders = me.getLoaders();
            
            me.log('success load module', xhr);
            
            Ext.GlobalEvents.fireEvent('loaderhide');
            
            if(response !== '') {

                loaders[xhr.my.idLoader][xhr.my.config.nameSpace] = true;

            } else {

                me.fireEvent('errorload', 'El servidor produjo una respuesta nula');

            }

            /* exec is loads all modulos */
            me.finishLoader(xhr.my);
            
        }
        
    },
    
    registerModule: function(module) {
        
        var me = this,
            nsBases = me.getNsBases(),
            configModule = module.getConfigModule();
    
        me.log('register module', configModule);
    
        nsBases [configModule.nameSpace] = module;
        
    },
    
    load: function(optionModule, cSuccess, cError) {
        
        var me = this,
            loaders = me.getLoaders(),
            loadersLoadeds = me.getLoadersLoadeds(),
            idLoader,
            i,
            module;
        
        me.log('load', arguments);
        
        if( !optionModule || typeof optionModule !== 'object') {
            
            me.log('config invalid', arguments);
            return false;
            
        }
        
        /* verificamos si se paso un array, sino lo comvertimos */
        if( !optionModule.length) {
            
            optionModule = [optionModule];
            
        }
        
        /* necesario por que si no se usa el scope  */
        if( typeof cSuccess !== 'function') {
            
            cSuccess = function() {};
        }
        
        if( typeof cError !== 'function') {
            
            cError = function() {};
            
        }
        
        idLoader = me.createLoader(cSuccess, cError, optionModule.length);
        
        /* recorremos los modulos solicitados a cargar */
        for(i in optionModule) {
            
            /* verificamos ke se haya especificao el nameSpace y su url */
            if( !optionModule[i].nameSpace || !optionModule[i].url) {
                
                me.log('config invalid');
                break;
            }
            
            /*
            * verificamos si el namespace es nuevo, solo los modulos 
            * registrados mediante la funcion de register modulo se contaran 
            * como modulos descargados y en ejecucion
            *
            */           
            module = me.nsIsLoaded(optionModule[i].nameSpace);
           
            if(module) {

                /* set ok load */
                /*
                 * de lo contrario la ventana de precarga se kedaria colgada, 
                 * en espera de ke continuen cargandose lo que se reinicio debido 
                 * a que las dependencias al final no conicidiran con el total
                 * 
                 */
                loaders [idLoader][optionModule[i].nameSpace]= module;
                loadersLoadeds[idLoader].load++;
                
                me.log('module is loaded', optionModule[i]);

                /* ejecutamos evento befoerreiniciar y reiniciar del modulo en otro process y continuamos el ciclo */
                setTimeout(function() {
                    
                    module.fireEvent('reboot', module, true);
                    
                }, 1);
                
                /* verify si es lo unico o lo ultimo ke tenia ke descargar */
                /* parseInt es necesario no se sabe por que no pasa la verificación 
                 * por tipo */
                if(optionModule.length-1 === parseInt(i) && cSuccess) {
                    
                    cSuccess(module, true);
                    
                }
                
                continue;

            }

            /* init loader modulo */
            me.loadModulo(idLoader, optionModule[i]);
            
        }
        
    }
    
});
