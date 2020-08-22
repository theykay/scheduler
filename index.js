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

    let currentDay = moment().format('DDMMYY');
    console.log(currentDay);

    // populate dropdown menu
    for (let i = 0; i < 24; i++) {
        const optionStart = $('<option>');
        const optionEnd = $('<option>');

        if (i != 23) {
            optionStart.text(moment().hour(i).format('h A'));
            optionStart.addClass('option-hours');
            optionStart.attr('id', i + 'S');
            optionStart.attr('data-hour', i);
            selectStart.append(optionStart);
        }

        if (i != 0) {
            optionEnd.text(moment().hour(i).format('h A'));
            optionEnd.addClass('option-hours');
            optionEnd.attr('id', i + 'E');
            optionEnd.attr('data-hour', i);
            selectEnd.append(optionEnd);
        }

    };

    // https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-option-in-a-select-box-using-jquery.php
    selectStart.change(function (event) {
        // reset options in other selector
        $(".option-hours").removeAttr("disabled");
        startSelect = $(event.target).children('option:selected').attr('data-hour');
        //startSelect = parseInt(startSelect);
        console.log(typeof (startSelect));
        selectEnd.attr('disabled', false);
        if (startSelect != 0) {
            for (let j = 0; j <= parseInt(startSelect); j++) {
                $('#' + j + 'E').attr('disabled', 'disabled');
            }
        }
        console.log(startSelect === 0 && endSelect);
        if (startSelect && endSelect) {
            // clear out div holding time slots
            $('#container').empty();
            // generate time slots
            makeSchedule(parseInt(startSelect), parseInt(endSelect));
            // add click listener to buttons
            $(".saveBtn").on("click", function (event) {
                const hourKey = event.target.dataset.hour;
                const hourData = event.target.previousElementSibling.value;
                localStorage.setItem(hourKey, hourData);
            });

            // disable end options before start time

        };
    });

    selectEnd.change(function (event) {
        // reset options in other selector
        $(".option-hours").removeAttr("disabled");
        endSelect = $(event.target).children('option:selected').attr('data-hour');
        endSelect = parseInt(endSelect);
        // disable start options after end Select
        for (let k = endSelect; k < 24; k++) {
            $('#' + k + 'S').attr('disabled', 'disabled');
        }
        if (startSelect && endSelect) {
            // clear out div holding time slots
            $('#container').empty();
            // generate time slots
            makeSchedule(startSelect, endSelect);
            // add click listener to buttons
            $(".saveBtn").on("click", function (event) {
                const hourKey = event.target.dataset.hour;
                const hourData = event.target.previousElementSibling.value;
                localStorage.setItem(hourKey, hourData);
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
            if (i < moment().format('HH')) {
                textEl.addClass('past');
            } else if (moment().format('HH') == i) {
                textEl.addClass('present');
            } else if (moment().format('HH') < i) {
                textEl.addClass('future');
            }
            textEl.attr('data-hour', i);
            textEl.attr('rows', '3');
            if (localStorage.getItem(i)) {
                textEl.text(localStorage.getItem(i));
            }

            let submit = $('<button>');
            submit.addClass('saveBtn col-2');
            submit.attr('data-hour', i);
            submit.text('submit');

            rowDiv.append(timeEl);
            rowDiv.append(textEl);
            rowDiv.append(submit);

            $('#container').append(rowDiv);
        }
    }

});