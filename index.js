// display current day in header jumbotron
$('#today').text(moment().format('dddd'));
let todayP = $('#currentDay');
// display current date and time
todayP.text(moment().format('DD MMMM'));
const selectStart = $('#selectStart');
const selectEnd = $('#selectEnd');

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

for (let i = 0; i < 24; i++) {
    const optionStart = $('<option>');
    const optionEnd = $('<option>');
    
    optionStart.text(formatTime(i));
    optionStart.attr('id', i);
    selectStart.append(optionStart);
    
    optionEnd.text(formatTime(i));
    optionEnd.attr('id', i);
    selectEnd.append(optionEnd);
}