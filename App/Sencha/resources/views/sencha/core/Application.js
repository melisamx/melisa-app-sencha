/**
 * Class base application
 */
Ext.define('Melisa.core.Application', {
    extend: 'Ext.app.Application',
    
    alternateClassName: [
        'Melisa.App'
    ],
    
    requires: Ext.platformTags.modern ? [
        'Melisa.override.form.field.Text',
        'Melisa.override.form.Panel',
        'Melisa.override.Button',
        'Melisa.override.plugin.PullRefresh',
        'Melisa.override.plugin.ListPaging',
        'Melisa.core.Logger',
        'Melisa.core.AutoOpenModule',
        'Melisa.core.ProfileDesktop',
        'Melisa.core.ProfilePhone',
        'Melisa.core.ViewController'
    ] : [
        'Melisa.override.form.Panel',
        'Melisa.override.form.field.Text',
        'Melisa.override.form.field.ComboBox',
        'Melisa.core.Logger',
        'Melisa.core.AutoOpenModule',
        'Melisa.core.ProfileDesktop',
        'Melisa.core.ProfilePhone',
        'Melisa.core.ViewController'
    ],
    
    launch: function() {
        
        /* remove WAI-ARIA warnings */
        Ext.ariaWarn = Ext.emptyFn;
        
    }
    
});
