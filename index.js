let containerEl = $('#container');
// display current date and time
let todate = $('<h3>');
todate.text(moment().format('dddd, DD MMMM'));
containerEl.append(todate);
// display current day in header jumbotron
$('#today').text(moment().format('dddd'));