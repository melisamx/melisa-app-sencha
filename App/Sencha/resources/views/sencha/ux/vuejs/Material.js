Ext.define('Melisa.ux.vuejs.Material', {
    singleton: true,
    
    constructor: function() {
        
        console.log('init vue material');
        Vue.use(VueMaterial);
        
    }
});
