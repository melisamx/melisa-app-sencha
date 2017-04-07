Ext.define('Melisa.ux.field.StoreFilter', {
    extend: 'Ext.AbstractPlugin',    
    alias: 'plugin.fieldstorefilter',
    
    store: null,
    queryDelay: 900,
    minChars: 3,
    queryMode: 'remote',
    config: {
        field: null,
        queryParam: 'nombre',
        operator: '='
    },
    useFilter: true,
    
    init: function(component) {
        
        var me = this;
        
        Ext.apply(component, {
            enableKeyEvents: true
        });
        
        me.field = component;
        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);
        
        if(typeof me.store === 'string') {
            
            me.store = {};
            
        }
        
        if(me.queryMode === 'remote') {
            
            /* necesario para que realice el filtro  */
            me.store.remoteFilter = true;
            
        }
        
        component.on('keyup', me.onKeyup, me);
        
        /* donot user alternateClassname  */        
        if(me.field.isXType('numberfield')) {
            
            me.field.on({
                spindown: me.onSpiner,
                spinup: me.onSpiner,
                scope: me
            });
                
        } else if(me.field.isXType('datefield')) {
            
            me.field.on({
                change: me.onSpiner,
                scope: me
            });
            
        } else if(me.field.isXType('combobox')) {
            
            /* necesario para permitir mandar query en combobox editable  */
            me.field.un('keyup', me.onKeyup, me);
            
            me.minChars = 1;
            
            me.field.on({
                select: me.onSpiner,
                change: me.onChangeCombobox,
                scope: me
            });
            
        }
        
    },
    
    onChangeCombobox: function(field) {
        
        var me = this,
            filterField = field.filter || {};
        
        if( field.getValue() === null) {
            
            me.store.filters.removeAtKey(me.queryParam);
            
            if(me.intervalLoadStore) {
                
                clearInterval(me.intervalLoadStore);
                
            }
            
            /* solo los que tenga auto load empty recargan store  */
            if(filterField && filterField.autoLoadEmpty) {
                
                me.intervalLoadStore = setTimeout(function() {

                    me.store.load();

                }, me.queryDelay);
                
            }
            
        }
        
    },
    
    onSpiner: function() {
        
        var me = this;
                
        me.lastQuery = '';
        
        me.doQueryTask.delay(me.queryDelay, null, me);
        
    },
    
    doRawQuery: function() {
        
        var me = this;
        
        if(me.field.isXType('combobox')) {
            
            me.doQuery(me.field.getValue(), false, true);
            
        } else {
            
            me.doQuery(me.field.getRawValue(), false, true);
            
        }
        
        return me;
        
    },
    
    doQuery: function(queryString, forceAll, rawQuery) {
        
        var me = this,
            queryPlan = me.beforeQuery({
                
                /* necesario para los combobos booleanos con value 0  */
                query: (queryString === 0 ? '0' : queryString) || '',
                queryParam: me.queryParam,
                rawQuery: rawQuery,
                forceAll: forceAll,
                field: me.field,
                store: me.store,
                cancel: false
            });
        
        if(queryPlan === false || queryPlan.cancel) {
            
            console.log('query plan cancel');
            return false;
            
        }
        
        if(queryPlan.query === me.lastQuery) {
            
            console.log('query equal');
            
        } else {
            
            me.lastQuery = queryPlan.query;
            
            if(me.queryMode === 'local') {
                
                me.doLocalQuery(queryPlan);
                
            } else {
                
                me.doRemoteQuery(queryPlan);
                
            }
            
        }
        
        return true;
        
    },
    
    doLocalQuery: function(queryPlan) {
        
        var me = this;
        
        if( !me.store) {
            
            return true;
        }
        
        if( !me.useFilter) {
            
            me.store.load({
                params: queryPlan.query
            });
            
        } else {
            
            me.addFilter(queryPlan.query);
            
        }
        
    },
    
    doRemoteQuery: function(queryPlan) {
        
        var me = this;
        
        if( !me.store) {
            
            return true;
        }
        
        if( !me.useFilter) {
            
            me.store.load({
                params: queryPlan.query
            });
            
        } else {
            
            me.addFilter(queryPlan.query);
            
        }
        
    },
    
    addFilter: function(queryString) {
        
        var me = this,
            event = {
                cancel: false,
                store: me.store,
                filter: {
                    id: me.queryParam,
                    property: me.queryParam,
                    value: queryString,
                    operator: me.getOperator()
                }
            };
        
        me.store.removeFilter(me.queryParam);
        
        if(me.field.fireEvent('beforeaddfilter', event, me) === false) {
            
            console.log('beforeaddfilter return false');
            return false;
            
        }
        
        if(event.cancel) {
            
            return true;
            
        }
        
        me.store.addFilter(event.filter);
        
    },
    
    beforeQuery: function(queryPlan) {
        
        var me = this;
        
        if(me.field.fireEvent('beforequery', queryPlan) === false) {
            
            queryPlan.cancel = true;
            
        } else if( !queryPlan.cancel) {
            
            if( me.lastKey === 8 && me.field.getValue() === '') {
            
                if(me.store) {
                    
                    me.lastQuery = null;
                    
                    /* directamente quitamos filtro  */
                    me.store.filters.removeAtKey(me.queryParam);
                    
                    /* necesario para que aplique remove filter  */
                    me.store.load();
                    /* no funciona  */
//                    me.store.removeFilter(me.queryParam);
                    
                    return false;

                }

            }
            
            if(queryPlan.query.length < me.minChars && !queryPlan.forceAll) {
                console.log('length');
                queryPlan.cancel = true;
                
            }
            
        }
        
        return queryPlan;
        
    },
    
    onKeyup: function(component, e) {
        
        var me = this,
            key = e.getKey();
    
        me.lastKey = key;
        
        if( !e.isSpecialKey() || key === e.BACKSPACE || key === e.DELETE) {
            
            me.doQueryTask.delay(me.queryDelay, null, me);
            
        }
        
        if (me.enableKeyEvents) {
            
            me.callParent(arguments);
            
        }
        
    },
    setStore: function(store) {
        
        this.store = store;
        
    }
    
});
