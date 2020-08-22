$(document).ready(function () {
    // when saving things to schedule, save attribute data-day and then delete any that don't match present day

    // display current day in header jumbotron
    $('#today').text(moment().format('dddd'));
    // display current date and time
    $('#currentDay').text(moment().format('LT, DD MMMM'));

    // first dropdown button
    const selectStart = $('#selectStart');
    // second dropdown button
    const selectEnd = $('#selectEnd');

    // start time for schedule
    let startSelect;
    // end time for schedule
    let endSelect;

    // populate 
    for (let i = 0; i < 24; i++) {
        const optionStart = $('<option>');
        const optionEnd = $('<option>');

        optionStart.text(moment().hour(i).format('h A'));
        optionStart.attr('id', i + 'S');
        optionStart.attr('data-hour', i);
        selectStart.append(optionStart);

        optionEnd.text(moment().hour(i).format('h A'));
        optionEnd.attr('id', i + 'E');
        optionEnd.attr('data-hour', i);
        selectEnd.append(optionEnd);
    };

    

    // https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-option-in-a-select-box-using-jquery.php
    selectStart.change(function (event) {
        // reset options in other selector
        $("#selectEnd option").removeAttr("disabled");
        startSelect = $(event.target).children('option:selected').attr('data-hour');
        startSelect = parseInt(startSelect);
        // disable end options before start Select
        for (let j = 0; j <= startSelect; j++) {
            $('#' + j + 'E').attr('disabled', 'disabled');
        }
        if (startSelect && endSelect) {
            $('#container').empty();
            makeSchedule(startSelect, endSelect);
            $(".saveBtn").on("click", function(event){
                console.log('hello ' + event.target);
            });
        };
    });

    selectEnd.change(function (event) {
        // reset options in other selector
        $('#selectStart option').removeAttr('disabled');
        endSelect = $(event.target).children('option:selected').attr('data-hour');
        endSelect = parseInt(endSelect);
        // disable start options after end Select
        for (let k = endSelect; k < 24; k++) {
            $('#' + k + 'S').attr('disabled', 'disabled');
        }
        if (startSelect && endSelect) {
            $('#container').empty();
            makeSchedule(startSelect, endSelect);
            $(".saveBtn").on("click", function(event){
                console.log('hello ' + event.target);
            });
        };
    });

    function makeSchedule(start, end) {
        for (let i = start; i < end + 1; i++) {
            let rowDiv = $('<div>');
            rowDiv.addClass('row')
            
            let timeEl = $('<div>');
            timeEl.addClass('hour col-2');
            timeEl.text(moment().hour(i).format('h:00 A'));
            
            let textEl = $('<textarea>');
            textEl.addClass('form-control col-8');
            if (moment().format('HH') > i) {
                textEl.addClass('past');
            } else if (moment().format('HH') == i) {
                textEl.addClass('present');
            } else if (moment().format('HH') < i) {
                textEl.addClass('future');
            }
            textEl.attr('data-hour', i);
            textEl.attr('rows', '3');

            let submit = $('<button>');
            submit.addClass('saveBtn col-2');
            submit.attr('data-hour', i);
            submit.attr('id', i + 'button');
            submit.text('submit');

            rowDiv.append(timeEl);
            rowDiv.append(textEl);
            rowDiv.append(submit);
            
            $('#container').append(rowDiv);
        }
    }

});