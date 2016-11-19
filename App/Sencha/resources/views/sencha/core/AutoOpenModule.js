
Ext.define('Melisa.core.AutoOpenModule', {
    extend: 'Melisa.core.Base',
    
    singleton: true,
    
    config: {
        debug: true,
        evento: null,
        store: null
    },
    
    constructor: function() {
        
        var me = this,
            ge = Ext.GlobalEvents,
            store = new Ext.util.LocalStorage({
                id: 'native'
            }),
            evento = store.getItem('notificacion');
        
        me.callParent(arguments);
        
        me.setStore(store);
        
        ge.on({
            autoopenmodule: me.onAutoOpen,
            instancecreate: me.onInstanceCreate,
            rebootmodule: me.onInstanceCreate,
            scope: me
        });
        
        /* necesario por que en dispositivo se congela T_T  */
        if( evento) {
            
            store.removeItem('notificacion');
            
        }
        
        me.onAutoOpen(evento);
        
    },
    
    onAutoOpen: function(eventObject) {
        
        var me = this,
            ge = Ext.GlobalEvents,
            evento;
        
        if( !eventObject) {
            
            me.log('No se especifico evento');
            return;
            
        }
        
        try {
            
            evento = Ext.JSON.decode(eventObject);
            
        } catch(e) {
            
        }
        
        if( !evento) {
            
            me.log('Evento mal formato se recibio', eventObject);
            return;
            
        }
        
        me.log('Evento recibido', evento);
        
        me.setEvento(evento);
        
        ge.fireEvent('loadermodule', evento.modulo);
        
    },
    
    onInstanceCreate: function(ns, instancia) {
        
        var me = this,
            evento = me.getEvento();
    
        if( !evento) {
            
            me.log('No se ha definido un evento');
            return;
            
        }
        
        if(evento.modulo.ns !== ns) {
            
            me.log('El nombre de espacio no es el esperado', ns);
            return;
            
        }
        
        me.setEvento(null);
        
        if( !evento.fireEvent) {
            
            me.log('No se especifico evento', evento);
            return;
            
        }
        
        instancia.getWrapper().fireEvent(evento.fireEvent, evento.params, evento);
        
    }
    
});
