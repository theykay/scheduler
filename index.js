$(document).ready(function () {

    // display current day in header jumbotron
    $('#today').text(moment().format('dddd'));
    // display current date and time
    $('#currentDay').text(moment().format('LT, DD MMMM'));

    const selectStart = $('#selectStart');
    const selectEnd = $('#selectEnd');

    // populate 
    for (let i = 0; i < 24; i++) {
        const optionStart = $('<option>');
        const optionEnd = $('<option>');

        optionStart.text(formatTime(i));
        optionStart.attr('id', i + 'S');
        optionStart.attr('data-hour', i);
        // optionStart.attr('class', 'starter');
        selectStart.append(optionStart);

        optionEnd.text(formatTime(i));
        optionEnd.attr('id', i + 'E');
        optionEnd.attr('data-hour', i);
        // optionEnd.attr('class', 'ender');
        selectEnd.append(optionEnd);
    }

    let startTime;
    let endTime;

    // https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-option-in-a-select-box-using-jquery.php
    $('#selectStart').change(function (event) {
        // reset options in other selector
        $("#selectEnd option").removeAttr("disabled");
        startTime = $(event.target).children('option:selected');
        // disable end options before start time
        for (let j = 0; j < startTime.index() + 1; j++) {
            $('#' + j + 'E').attr('disabled', 'disabled');
        }
    });

    $('#selectEnd').change(function (event) {
        // reset options in other selector
        $('#selectStart option').removeAttr('disabled');
        endTime = $(event.target).children('option:selected');
        // disable start options after end time
        for (let k = endTime.index(); k < 24; k++) {
            $('#' + k + 'S').attr('disabled', 'disabled');
        }
    });
    // use startTime and endTime to create hourly schedule (inside if statement that only runs if endtime is not undefined)

    

    function formatTime(number) {
        let formatted = '';
        if (number === 0) {
            formatted = '12 AM';
        } else if (number >= 1 && number < 12) {
            formatted = number + ' AM';
        } else if (number === 12) {
            formatted = number + ' PM';
        } else {
            formatted = number - 12 + ' PM';
        }
        return formatted;
    }
});