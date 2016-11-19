
Ext.define('Melisa.core.ViewController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.nviewcontroller',
    
    mixins: [
        'Melisa.core.Base'
    ],
    
    init: function() {
        
        var me = this,
            view = me.getView(),
            renderEvent = Ext.platformTags.modern ? 'painted' : 'render';
    
        view.on(renderEvent, me.onRender, me, {
            single: true
        });
        
    },
    
    /* necesario para obtener la configuración asignada a la vista wrapper
     * en la versión modern solo funcina asta que se haya painted la vista  */    
    getConfigModule: function() {
        
        return this.getView().up('[action="wrapper"]').getConfigModule();
        
    },
    
    getWrapper: function() {
        
        return this.getView().up('[action="wrapper"]');
        
    },
    
    onRender: function() {}
        
});
