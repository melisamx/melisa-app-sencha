Ext.define('Melisa.override.form.field.vtypes.Time24', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    time24: function(value) {
        return this.time24Re.test(value);
    },
    // RegExp for the value to be tested against within the validation function
    time24Re: /^(0?[1-9]|1[0-9]):([0-5][0-9])(:([0-5][0-9]))?$/i,
    // vtype Text property: The error text to display when the validation function returns false
    time24Text: 'No es una hora valida. Debe estar en el formato "13:34".',
    // vtype Mask property: The keystroke filter mask
    time24Mask: /[\d:]/i
});
