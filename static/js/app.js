window.onload = function() { init() };

function init() {
  // See https://github.com/jsoma/tabletop for documentation
  Tabletop.init({ key: '1BeJOhtvXEvJCGweJnmJm4y0no1BeelfrwmOyTmaQj9I',
    callback: function(data, tabletop) {
      var template = document.querySelector('#template').innerHTML;
      var pastReadings = document.querySelector('#past-readings');
      var upNext = document.querySelector('#up-next');
      var thisWeek = document.querySelector('#this-week');
      var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

      var today = new Date();

      // Iterate in reverse order, so that most recent papers appear first
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i]['Leader'] === '') {
          continue;
        }
        var date = new Date(data[i]['Date'] + ' 15:00');
        var dateS = date.getDate() + '<br>' + months[date.getMonth()];
        var entry = template.replace('{{entry-date}}', dateS);
        entry = entry.replace('{{entry-title}}', data[i]['Paper']);
        entry = entry.replace('{{entry-presenter}}', data[i]['Leader']);
        entry = entry.replace('{{entry-link}}', data[i]['URL']);
        if (date > today) {
          $(upNext).prepend(entry);
        } else {
          $(pastReadings).append(entry);
        }
      }
    }, simpleSheet: true });
}
