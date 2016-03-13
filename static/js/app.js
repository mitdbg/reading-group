$.getJSON('data.json', function(data){
  console.log(data);
  var template = document.querySelector('#template').innerHTML;
  var pastReadings = document.querySelector('#past-readings');
  var upNext = document.querySelector('#up-next');
  var thisWeek = document.querySelector('#this-week');
  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  var today = new Date();

  for (var i=0; i<data.length; i++) {
    var date = new Date(data[i][0] + ' 15:00');
    var dateS = date.getDate() + '<br>' + months[date.getMonth()];
    var entry = template.replace('{{entry-date}}', dateS);
    entry = entry.replace('{{entry-title}}', data[i][2]);
    entry = entry.replace('{{entry-presenter}}', data[i][1]);
    entry = entry.replace('{{entry-link}}', data[i][4]);
    if (date > today) {
			$(upNext).prepend(entry);
    } else {
			$(pastReadings).append(entry);
    }
  }
}).fail(function() {
      console.log( "error"  );

});
