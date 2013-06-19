
(function($) {
  'use strict';  
  
  $('.view-link').click(function(e){
    e.preventDefault();

    var href = $(this).attr('href');

    $.get(href, function(data) {
      $('#stats').html('');

      $.each(data.contributions, function(i, contribution){
        $('#stats').append(contribution.commit.author.date + '<br><br>');
      });


    });        
  });

})(jQuery);  