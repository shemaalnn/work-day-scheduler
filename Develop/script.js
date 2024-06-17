// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// loading html before function is executed and current date is also set 
$(document).ready(function () {
  $('#currentDay').text(dayjs().format('DD/MM/YYYY'));

// event listener for click for the save button to save input from user in the local storage 
  $('.saveBtn').on('click', function(){
    var value = $(this).siblings('.description').val();
    var times = $(this).parent().attr('id');

    localStorage.setItem(times, value);

    
// shows the notification
    $('.notification').addClass('show'); 
    setTimeout(function () {
      $('.notification').removeClass('show');
    }, 10000); // removes notification after 10 seconds 

  });
//loading events from local storage 
  function loadEvents() {

  $('.time-block').each(function() {
    var times = $(this).attr('id');
    var event = localStorage.getItem(times);
  if (event) {
    $(this).find('.description').val(event);
  }
  })
  }
//this function assigns specific classes to each block based on the hour of the day
  function updateHours () {

    var currentHour = dayjs().hour();
    $('.time-block').each(function() {
      var hour = parseInt($(this).attr('id').split('-')[1]);

    $(this).removeClass('past present future');

      if (hour < currentHour) {
        $(this).addClass('past');
      } else if (hour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

// Calling all functions on page load
  updateHours();
  loadEvents();

  setInterval(updateHours, 60000) // updates classes every minute
})