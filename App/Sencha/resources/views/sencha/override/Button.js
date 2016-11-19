
Ext.override(Ext.Button, {
    
    initialize: function() {
        
        this.callParent();
        
        if( !Waves) {
            
            return;
            
        }
        
        /* preferible ya que termina usando waves-circle cuando se especifica
         * ui en la configuracion
         */
        this.element.addCls('waves-effect waves-circle');
        
        Waves.attach(this.element.dom);
        Waves.init();
        
    }
    
});

Ext.define('Melisa.override.Button', {});
