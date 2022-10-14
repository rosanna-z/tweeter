$(document).ready(function() {

  // counter
  $('textarea').on('input', function() {
    const text = $(this).val();
    const remaining = 140 - text.length;

    const parent = $(this).closest('form');
    const counter = parent.find('.counter');
    counter.text(remaining);

    if (remaining < 0) {
      $('.counter').addClass('invalid');
    }
    else {
      $('.counter').removeClass('invalid');
    }
  });
});


