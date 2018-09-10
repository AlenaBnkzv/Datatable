let jsTableMinClass = '.js-table-min';
let jsChairMinClass = '.js-chair-min';

let averageTableElem = $('.js-average-table');
let averageChairElem = $('.js-average-chair');

let $tableBody = $('#js-table-body');
let $buttonAdd = $('#js-add-row');

$(document).on('click', '.form_date', (e) => {
    let $datePicker = $(e.target).datetimepicker({
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $datePicker.datetimepicker('show');
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calcAverage(fieldsSelector) {
    let fields = $(fieldsSelector);
    let sum = 0;

    fields.each((i, item) => {
        sum += +item.value;
    });

    return sum / fields.length;
}

function fieldValidate(field) {
    let fieldValue = field.value;

    if (isNumeric(fieldValue) && (fieldValue >= 0 && fieldValue <= 100)){
        return true;
    }
    return false;
}

$(document).on('blur', jsTableMinClass, (event) => {
    let targetField = event.target;
    let isValid = fieldValidate(targetField);

    if (isValid){
        let tableMinAverage = calcAverage(jsTableMinClass);
        averageTableElem.text(tableMinAverage.toFixed(2));
    }
    else {
        $(targetField).addClass('is-invalid').val('');
    }
});

$(document).on('blur', jsChairMinClass, (event) => {
    let targetField = event.target;
    let isValid = fieldValidate(targetField);

    if (isValid){
        let tableMinAverage = calcAverage(jsChairMinClass);
        averageChairElem.text(tableMinAverage.toFixed(2));
    }
    else {
        $(targetField).addClass('is-invalid').val('');
    }
});

$(document).on('focus', `${jsTableMinClass}, ${jsChairMinClass}`, (e) => {
   $(e.target).removeClass('is-invalid');
});

$(document).on('click', '.js-checkbox', (e) =>{
    let $targetCheckbox = $(e.target);
    let $checkboxParent = $targetCheckbox.closest('.js-checkbox-group');
    let $field =  $checkboxParent.find('.js-form-control');
    let isChecked = $targetCheckbox.prop('checked');

    $field.prop( "disabled", !isChecked);
});

function clearFieldsRow(row) {
    row.find('.form-control').val("").removeClass('is-invalid');
    row.find('.js-checkbox').prop('checked', false);
    row.find('.js-form-control').prop('disabled', true);
}

$buttonAdd.on('click', () => {
    let $firstTr = $tableBody.children().first();
    let $cloneFirstTr = $firstTr.clone();
    clearFieldsRow($cloneFirstTr);
    $cloneFirstTr.appendTo($tableBody);
});