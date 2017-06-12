Ext.define('Melisa.util.Format', {
    override: 'Ext.util.Format'
});

Ext.onReady(function() {
    Ext.apply(Ext.util.Format, {
        decimalSeparator: '.',
        thousandSeparator: ','
    });
});
