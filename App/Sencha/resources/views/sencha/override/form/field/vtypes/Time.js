Ext.define('Melisa.override.form.field.vtypes.Time', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    time: function(value) {
        return this.timeRe.test(value);
    },
    // RegExp for the value to be tested against within the validation function
    timeRe: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
    // vtype Text property: The error text to display when the validation function returns false
    timeText: 'No es una hora valida. Debe estar en el formato "12:34 PM".',
    // vtype Mask property: The keystroke filter mask
    timeMask: /[\d\s:amp]/i
});
