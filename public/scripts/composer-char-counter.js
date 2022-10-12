$(document).ready(function() {

  // counter
  $('textarea').on('input', function() {
    const input = $(this);
    const text = input.val();
    const remaining = 140 - text.length;

    // const $counter = $('.counter');
    // $counter.text(remaining);

    const parent = input.parent();
    const counter = parent.find('.counter');
    console.log(counter);
    counter.text(remaining);

    if (remaining < 0) {
      $('.counter').addClass('invalid');
    }
    else {
      $('.counter').removeClass('invalid');
    }
  });
});


