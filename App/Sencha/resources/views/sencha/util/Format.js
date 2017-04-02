Ext.define('Melisa.util.Format', {
    override: 'Ext.util.Format'
});

/* no funciona o_T */
Ext.apply(Ext.util.Format, {
    decimalSeparator: '.',
    thousandSeparator: ','
});
