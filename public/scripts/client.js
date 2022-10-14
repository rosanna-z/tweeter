$(document).ready(() => {
  const $tweetsContainer = $('.all-tweets');

  // make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };


  // calls createTweetElement for each tweet and
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend(tweetElement);
    }
  };

  // Creates a new tweet
  const createTweetElement = function(tweetObj) {
    // Prevent cross-site scripting
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = $(`
  <article class="tweet">
  <div class=tweet-profile><img src="${tweetObj.user.avatars}"><div class=username>${tweetObj.user.name}</div></img><span>${tweetObj.user.handle}</span></div>
  <div class="tweet-text">${escape(tweetObj.content.text)}</div>
  <footer>
    ${timeago.format(tweetObj.created_at)}
    <span>
      <i class="fa-sharp fa-solid fa-flag"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
    </span>
  </footer>
</article>
  `);
    return $tweet;
  };

  // listen for the form to submit
  const $form = $('#form');
  $form.on('submit', (event) => {
    // prevents browser from default action
    event.preventDefault();
    $('.error').hide();

    // grabbing the text value
    const $tweetText = ($('#tweet-text').val()).trim();

    // validate if text is empty/null or longer than 140 letters
    if (!$tweetText) {
      $('.error-message').text('Error Message: You must input text in your tweet.');
      $('.error').slideDown();
      return;
    }
    if ($tweetText.length > 140) {
      $('.error-message').text('Oops! Your tweet is too long!');
      $('.error').slideDown();
      return;
    }

    // get + serialize the data from form
    const newTweet = $form.serialize();

    // send info to server with POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: newTweet
    })
      .then(() => {
        $('#tweet-text').val('');
        $('.error').slideUp();
        $('.counter').val('140');
        $tweetsContainer.prepend(loadTweets());
      });
  });

  loadTweets();
});